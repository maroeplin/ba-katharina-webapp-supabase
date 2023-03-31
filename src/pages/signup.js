import { useState } from "react";
import { useRouter } from "next/router";
import supabase from "@/utils/supabase-client";
export default function Signup() {

  //signUp
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  //authenticate with otp
  const [token, setToken] = useState("");

  const router = useRouter();
  
  async function signUpWithPhone() {
    try {
      if (phone) {
        const response = await supabase.auth.signUp({
          phone: phone,
          password: password,
        });
        //error field
        if (response.error) throw response.error;
        console.log('error: ', response.error)
        
        //data field
        const userId = response.data.user?.id
        setIsRegistered(true);
        console.log('userId: ', userId);
        
      }
     
    } catch {}
  }

  //authenticate with OTP-Token
  
  async function loginWithToken() {
    try {
      if (token) {
        
        const response = await supabase.auth.verifyOtp({
          token
        });
        //error field
        if (response.error) throw response.error;
        console.log("error: ", response.error);
        //data field
        const userId = response.data.user?.id;
        console.log("userId: ", userId);
        console.log("User wurde authentifiziert.");
        setIsRegistered(true);
        //zurück zur Startseite
        router.push("/index");
      }
    } catch {}
  }



  return (
    <div className="w-2/3 max-w-6xl pt-32 m-auto md:w-1/3">

    {!isRegistered ? (
      <>

      <h1 className="pb-8 text-2xl text-center">Vielen Dank, dass du bei dem Versuch <span className="font-bold">XYZ</span> teilnehmen möchtest.
      </h1>
      
      <h2 className="pb-8 text-center">Mit deiner Mobilnummer und einem Passwort kannst du dich registrieren.</h2>

      <label
      htmlFor="phone"
      className="block mt-4 text-sm font-medium text-gray-700"
    >
      Mobilnummer <br/><span className="text-gray-400">Ländervorwahl +49</span>
    </label>
    <div className="w-full ">
      <input
        type="phone"
        name="phone"
        id="phone"
        required
        title="Die Mobilnummer sollte folgendes Schema haben: +49 111 1111 1111"
        minlength="13"
        maxlength="14"
        className="block w-full pt-2 pb-2 pl-2 border border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
        placeholder="+49 111 1111 1111"
        onChange={(e) => setPhone(e.target.value)}
      ></input>
      </div>


      <label
        htmlFor="password"
        className="block mt-4 text-sm font-medium text-gray-700"
      >
        Passwort (min. 6 Zeichen)
      </label>
      <div className="w-full mt-1">
      <input
        type="password"
        name="password"
        id="password"
        title="Das Passwort sollte mindestens 6 Zeichen lang sein."
        required
        minlength="13"

        className={password?.length <= 6 ? ("block w-full border border-gray-200 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500") : ("block w-full border border-teal-400 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500")}
        placeholder="•••••••••"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      </div>
      
      <button
        type="button"
        className="text-white bg-teal-400 hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-teal-400 dark:hover:bg-teal-700 dark:focus:ring-purple-900 mt-4"
        onClick={signUpWithPhone}
      >
        registrieren
      </button>
    
      </> ):( 
        <div className="pt-24">
          <h1 className="pb-8 text-2xl text-center">Vielen Dank für die Registrierung. Du erhältst deinen <span className="font-bold">Anmelde-Code mit einer SMS</span>.   <span role="img" aria-label="done">✅</span></h1>

          <label
            htmlFor="token"
            className="block mt-4 text-sm font-medium text-left text-gray-700"
          >
            Anmelde-Code
          </label>
          <div className="w-full mt-1">
            <input
              type="token"
              name="token"
              id="token"
              className="block w-full pt-2 pb-2 pl-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 mt-8focus:ring-indigo-500"
              placeholder="••••••"
              onChange={(e) => setToken(e.target.value)}
            ></input>
          </div>
          <button
            type="button"
            className="text-white bg-teal-400 hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-teal-400 dark:hover:bg-teal-700 dark:focus:ring-teal-900 m-auto mt-8"
            onClick={loginWithToken}
          >
            Account aktivieren
          </button>

        </div>
        )
     }
        
    </div>
  );
}