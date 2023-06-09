import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

import { useEffect, useState } from "react";
import supabase from "@/utils/supabase-client";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");

  const [stimmung, setStimmung] = useState("");
  const [beschreibung, setBeschreibung] = useState("");

  const [currentUser, setCurrentUser] = useState([]);

  /*hier soll gecheckt werden, ob der User eingelogged ist und zwar, wenn die Page geladen wurde (sofort, wenn das component geladen wurde)
  
  useEffect(argument1, argument2) 
  useEffect(() => { }, [])
  
  */
  useEffect(() => {
    const getUser = async () => {
      const user = await supabase.auth.getUser();
      //mit dem log bekommt man den user als JSON-Objekt angezeigt
      console.log("user", user);

      //hier wird gecheckt, ob der User überhaupt authentifiziert ist
      if (user) {
        const userId = user.data?.user?.id;
        setIsAuthenticated(true);
        setUserId(userId);
        setCurrentUser(user);
      }
    };

    getUser();
  }, []);




  async function loginWithToken() {
    setIsAuthenticated(false);
  }

  console.log("authentifiziert? ", isAuthenticated);
  console.log("currentUser: ", currentUser);
  return (
    <>
      <Head>
        <title>ba-katharina-webapp</title>
        <meta name="description" content="Nextjs Framework" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="w-auto pt-48 m-auto text-center">
          <h1 className="text-3xl font-light text-center md:text-4xl ">Herzlich Willkommen!</h1>
          <div>
          <h2 className="w-9/12 pt-8 m-auto text-lg text-center md:w-1/3"> Logge dich ein, um an der Befragung teilzunehmen. Falls du noch kein Konto erstellt hast, registriere dich bitte.</h2>
            
          </div>
         

          {!isAuthenticated ? (
            null
          ) : (
            <div className="grid pt-8 m-auto ">
              <Link href="/signup">
                <button
                  type="button"
                  className="px-10 py-4 mt-4 mb-4 text-sm font-medium text-center text-white bg-black rounded-full hover:bg-black focus:outline-none focus:ring-4 focus:ring-teal-300 dark:bg-black dark:hover:bg-gray-800 dark:focus:ring-teal-900"
                >
                  Registrieren
                </button>
              </Link>
              <Link href="/login" className="mt-4 mb-2">
                <button
                  type="button"
                  className="px-8 py-4 m-auto mb-4 text-sm font-medium text-center text-black border border-black rounded-full hover:bg-bg-black-700 focus:outline-none focus:ring-4 focus:ring-bg-black-200 dark:hover:bg-black-700 dark:focus:ring-bg-black-700 "
                >
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
