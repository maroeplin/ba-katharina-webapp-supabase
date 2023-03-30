import { useRouter } from "next/router";
import { useState } from "react";
import supabase from "@/utils/supabase-client";

export default function Login() {
  const [token, setToken] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const router = useRouter();

  async function loginWithToken() {
    try {
      if (token) {
        const response = await supabase.auth.verifyOtp({
          phone: phone,
          token: token,
          type: "sms",
        });
        //error field
        if (response.error) throw response.error;
        console.log("error: ", response.error);
        //data field
        const userId = response.data.user?.id;
        console.log("userId: ", userId);
        setIsRegistered(true);
        //zurück zur Startseite
        router.push("/");
      }
    } catch {}
  }

  return (
    <div className="w-1/3 max-w-6xl pt-32 m-auto">
      {!isRegistered ? (
        <>
          <h1 className="pb-8 text-2xl text-center">
            Bitte dein <span className="font-bold">SMS-Token</span> eingeben und
            deinen Account aktivieren.
          </h1>
          <label
            htmlFor="token"
            className="block mt-4 text-sm font-medium text-gray-700"
          >
            Token
          </label>
          <div className="w-full mt-1">
            <input
              type="token"
              name="token"
              id="token"
              className="block w-full pt-2 pb-2 pl-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="••••••"
              onChange={(e) => setToken(e.target.value)}
            ></input>
          </div>
          <button
            type="button"
            className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 mt-4"
            onClick={loginWithToken}
          >
            Account aktivieren
          </button>{" "}
        </>
      ) :  <div className="pt-24">
      <h1 className="text-2xl text-center">Du hast deinen Account aktiviert. <span className="font-bold">Zu meinem Dashboard</span>.   <span role="img" aria-label="done">✅</span></h1>
    
    </div>}
    </div>
  );
}
