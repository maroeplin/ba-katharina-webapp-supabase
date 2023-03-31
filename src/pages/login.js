import { useRouter } from "next/router";
import { useState } from "react";
import supabase from "@/utils/supabase-client";

export default function Login() {
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  async function loginWithPhone() {
    try {
      if (phone && password) {
        const response = await supabase.auth.signInWithPassword({
          phone: phone,
          password: password,
        });
      
        console.log("error: ", response.error);
        //data field
        const userId = response.data.user?.id;
        console.log("userId: ", userId);
        console.log("User wurde authentifiziert.");
        setIsAuthenticated(true);
        //zurück zur Startseite
        router.push("/dashboard");
      }
    } catch (error) {
      console.log('error: ', error);
    }
  }

  const backToHome = () => {
    router.push("/")
  }

  return (
    <div className="items-center content-center justify-center w-2/3 max-w-6xl pt-32 m-auto text-center md:w-1/3 md:max-w-1/3">
      {console.log('Authentifiziert?', isAuthenticated)}
      {!isAuthenticated ? (
        <>
          <div className="pt-24 pb-8 md:w-full">
            <h1 className="text-2xl text-center">Logge dich ein.</h1>
          </div>

          <label
            htmlFor="phone"
            className="block mt-4 text-sm font-medium text-left text-gray-700"
          >
            Mobilnummer
          </label>
          <div className="w-full mt-1">
            <input
              type="phone"
              name="phone"
              id="phone"
              title="Die Mobilnummer sollte im Schema +49 111 1111 1111 eingegeben werden."
              required
              minLength="12"
              className={
                phone?.length <= 12
                  ? "block w-full border border-gray-200 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 p-2"
                  : "block w-full border border-teal-400 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500 p-2"
              }
              placeholder="+49 111 1111 1111"
              onChange={(e) => setPhone(e.target.value)}
            ></input>
          </div>
          
          <label
            htmlFor="password"
            className="block mt-4 text-sm font-medium text-left text-gray-700"
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
              minLength="6"
              className={
                password?.length <= 6
                  ? "block w-full border border-gray-200 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500"
                  : "block w-full border border-teal-400 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
              }
              placeholder="•••••••••"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="grid md:grid-cols-2">
          <button
            type="button"
            className="text-white bg-teal-400 hover:bg-bg-teal-700 focus:outline-none focus:ring-4 focus:ring-bg-teal-200 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-teal-400 dark:hover:bg-teal-700 dark:focus:ring-bg-teal-700 m-auto mt-8"
            onClick={loginWithPhone}
          >
            Login
          </button>

          <button
            type="button"
            className="text-teal-400  hover:bg-bg-teal-700 border border-teal-400 focus:outline-none focus:ring-4 focus:ring-bg-teal-200 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:hover:bg-teal-700 dark:focus:ring-bg-teal-700 m-auto mt-8"
            onClick={backToHome}
          >
            Home
          </button>
          </div>
        </>
      ) : (
        <div className="pt-24">
          <h1 className="text-2xl text-center">
            Du hast deinen Account aktiviert.
            <span className="font-bold">Zu meinem Dashboard</span>.
            <span role="img" aria-label="done">
              ✅
            </span>
          </h1>
        </div>
      )}
    </div>
  );
}
