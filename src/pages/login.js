import { useRouter } from "next/router";
import { useState } from "react";
import supabase from "@/utils/supabase-client";

export default function Login() {
  const [password, setPassword] = useState(null);
  const [phone, setPhone] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //error check for password
  const [hasError, setHasError] = useState(false);
  const router = useRouter();

  async function loginWithPhone() {
    try {
      if (phone && password) {
        const response = await supabase.auth.signInWithPassword({
          phone: phone,
          password: password,
        });

        if (response.error) {
          console.log("Falsches Passwort!");
          setHasError(true);
          return;
        }

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
      console.log("error: ", error);
    }
  }

  const backToHome = () => {
    router.push("/");
  };

  return (
    <div className="items-center content-center justify-center w-2/3 max-w-6xl pt-32 m-auto text-center md:w-1/3 md:max-w-1/3">
      {console.log("Authentifiziert?", isAuthenticated)}
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
              placeholder="+4911111111111"
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
              minLength="5"
              className={
                password?.length <= 5
                  ? "block w-full border border-gray-200 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500"
                  : "block w-full border border-teal-400 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
              }
              placeholder="•••••••••"
              onChange={(e) => setPassword(e.target.value)}
            ></input>

            {hasError ? (
              <h1 className="pt-2 pb-2 mt-2 font-semibold text-white bg-red-600 rounded-lg">
                Das eingegebene Passwort war leider falsch.
              </h1>
            ) : null}
          </div>
          <div className="flex justify-center w-1/2 h-auto grid-cols-2 gap-8 m-auto felx-wrap">
            <button
              type="button"
              className="px-8 py-4 m-auto mt-8 mb-4 font-medium text-center text-white bg-teal-400 rounded-full text-md hover:bg-bg-teal-700 focus:outline-none focus:ring-4 focus:ring-bg-teal-200 dark:bg-teal-400 dark:hover:bg-teal-700 dark:focus:ring-bg-teal-700"
              onClick={loginWithPhone}
            >
              Login
            </button>

            <button
              type="button"
              className="px-8 py-4 m-auto mb-4 text-sm font-medium text-center text-teal-400 border border-teal-400 rounded-full hover:bg-bg-teal-700 focus:outline-none focus:ring-4 focus:ring-bg-teal-200 dark:hover:bg-teal-700 dark:focus:ring-bg-teal-700 md:mt-8"
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
