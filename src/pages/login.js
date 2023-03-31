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
    <div className="items-center content-center justify-center w-2/3 max-w-6xl pt-32 m-auto text-center md:w-1/3 md:max-w-1/3">
      {!isRegistered ? (
        <>
          <div className="pt-24 pb-8 md:w-full">
            <h1 className="text-2xl text-center">
              Vielen Dank für die Registrierung. Du erhältst deinen{" "}
              <span className="font-bold">Anmelde-Code mit einer SMS</span>.{" "}
              <span role="img" aria-label="done">
                ✅
              </span>
            </h1>
          </div>
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
            className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 m-auto mt-8"
            onClick={loginWithToken}
          >
            Account aktivieren
          </button>

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
