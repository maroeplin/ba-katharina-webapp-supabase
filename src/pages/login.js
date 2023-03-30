import { useRouter } from "next/router";
import { useState } from "react";
import supabase from "@/utils/supabase-client";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function signInWithEmail() {
    try {
      if (email && password) {
        const response = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        //error field
        if (response.error) throw response.error;
        console.log('error: ', response.error)
        //data field
        const userId = response.data.user?.id
        console.log('userId: ', userId);
        //zurück zur Startseite
        router.push('/')
      }
    } catch {}
  }

  return (
    <div className="w-1/3 max-w-6xl pt-32 m-auto">
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
          onClick={signInWithEmail}
        >
          Purple
        </button>
      
    </div>
  );
}
