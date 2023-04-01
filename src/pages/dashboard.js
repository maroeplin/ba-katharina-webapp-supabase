import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "@/utils/supabase-client";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");

  const [stimmung, setStimmung] = useState("");
  const [beschreibung, setBeschreibung] = useState("");

  //in den folgenden Hook kommt das object aus der Datenbank
  const [datenset, setDatenset] = useState([]);

  const [currentUser, setCurrentUser] = useState([]);

  const router = useRouter();
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

  useEffect(() => {
    const getLinks = async () => {
      try {
        const { data, error } = await supabase
          .from("datenset")
          .select("beschreibung, stimmung, created_at")
          .eq("user_id", userId);

        if (error) throw error;

        console.log("data: ", data);
        setDatenset(data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    if (userId) {
      getLinks();
    }
    //sobald sich der Value in den brackets von useEffect ändert, wird der Code Block darüber ausgeführt (der Block wird jedes Mal recalled)
  }, [userId, beschreibung, stimmung]);

  const addNewLink = async () => {
    try {
      if (beschreibung) {
        const { data, error } = await supabase.from("datenset").insert({
          user_id: userId,
          beschreibung: beschreibung,
          stimmung: stimmung,
        });
        if (error) throw error;
        console.log("data", data);
        if (datenset) {
          setDatenset([...datenset, data]);
          alert("Eintrag wurde in die Datenbank geschrieben.");
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  async function loginWithToken() {
    setIsAuthenticated(false);
  }

  const backToHome = () => {
    router.push("/");
  };

  console.log("authentifiziert? ", isAuthenticated);
  console.log("currentUser: ", currentUser);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="w-1/3 pt-48 m-auto text-center">
          <h1 className="text-4xl font-light">Herzlich Willkommen!</h1>

          {isAuthenticated && (
            <>
              {console.log("datensetXX: ", datenset)}
              <div className="grid gap-2 pt-8 m-auto">
                <label
                  htmlFor="phone"
                  className="block mt-4 text-sm font-medium text-left text-gray-700"
                >
                  Wie fühlst du dich gerade?
                </label>

                <input
                  type="text"
                  name="stimmung"
                  id="stimmung"
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Stimmung"
                  onChange={(e) => setStimmung(e.target.value)}
                ></input>
              </div>

              <div className="w-full mt-1 mb-4">
              <label
                  htmlFor="phone"
                  className="block mt-4 text-sm font-medium text-left text-gray-700"
                >
                  Wie fühlst du dich gerade?
                </label>
                
                <input
                  type="text"
                  name="beschreibung"
                  id="beschreibung"
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Beschreibung"
                  onChange={(e) => setBeschreibung(e.target.value)}
                ></input>
              </div>
              <div className="grid grid-rows-2">
                <button
                  type="button"
                  className="text-white dark:bg-teal-400 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2  dark:hover:bg-teal-700 dark:focus:ring-teal-900 mt-4"
                  onClick={addNewLink}
                >
                  Eintrag erstellen
                </button>

                <button
                  type="button"
                  className="text-teal-400  hover:bg-bg-teal-700 focus:outline-none focus:ring-4 focus:ring-bg-teal-200  border border-teal-400 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2  dark:hover:bg-teal-700 dark:focus:ring-bg-teal-700 m-auto mt-8"
                  onClick={backToHome}
                >
                  Logout
                </button>
              </div>

              <section className="bg-gray-100">
             
                <div className="justify-center w-full m-auto mt-12 text-center">
                  {datenset.map((object, index) => {
                    return (
                      <div
                        key={index}
                        className="p-4 mb-4 border-b-2"
                      >
                        <h1>{object.created_at}</h1>
                        {object.stimmung}
                      </div>
                    );
                  })}
                  {console.log("Datenset", { datenset })}
                </div>
               
              </section>

              {/* 
              {currentUser?.data.user.phone != 0 && ( <div className="w-2/3 m-auto mt-8 text-sm text-center">
     
        <h2 className="font-semibold">Test: deine Telefonnummer: {currentUser?.data?.user?.phone}</h2> 

       
        </div> )}
      */}
            </>
          )}
        </div>
      </main>
    </>
  );
}
