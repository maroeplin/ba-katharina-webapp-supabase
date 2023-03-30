import { useState } from "react";
import supabase from "@/utils/supabase-client";
export default function Signup() {
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  
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
        console.log('userId: ', userId);
      }
     
    } catch {}
  }



  return (
    <div className="w-1/3 max-w-6xl pt-32 m-auto">

    {/* 
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        E-mail
      </label>
      <div className="w-full mt-1">
        <input
          type="email"
          name="email"
          id="email"
          className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="email@beispiel.de"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        </div>
    */}   

        <label
        htmlFor="phone"
        className="block mt-4 text-sm font-medium text-gray-700"
      >
        Mobilnummer
      </label>
      <div className="w-full ">
        <input
          type="phone"
          name="phone"
          id="phone"
          className="block w-full pt-2 pb-2 pl-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="+111 1111 1111"
          onChange={(e) => setPhone(e.target.value)}
        ></input>
        </div>


        <label
          htmlFor="password"
          className="block mt-4 text-sm font-medium text-gray-700"
        >
          Passwort
        </label>
        <div className="w-full mt-1">
        <input
          type="password"
          name="password"
          id="password"
          className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="•••••••••"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        </div>
        
        <button
          type="button"
          className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 mt-4"
          onClick={signUpWithPhone}
        >
          registrieren
        </button>
      
    </div>
  );
}