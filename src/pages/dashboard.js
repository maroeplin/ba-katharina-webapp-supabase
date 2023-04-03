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
          setDatenset([data, ...datenset]);
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
        <div className="w-auto max-w-md pt-48 m-auto text-center md:max-w-2xl">
          <h1 className="text-4xl font-light">Herzlich Willkommen!</h1>
          <ul>
            <li>Vielen Dank, dass du an meiner Befragung zu deinem verfassungszustand teilnimmst.</li>
            <li>Nehme dir drei mal am Tag die Zeit und beantworte folgende Fragen ehrlich.</li>
            <li></li>
          </ul>
          {currentUser && currentUser?.data?.user.phone > 0 && (
            <div className="w-2/3 m-auto mt-8 text-sm text-center">
              <h2 className="font-semibold">
                Deine Telefonnummer:{" "}
                {currentUser && currentUser?.data?.user?.phone}
              </h2>
            </div>
          )}

          {isAuthenticated && (
            <>
              {console.log("datensetXX: ", datenset)}
              <div className="grid w-2/3 gap-2 pt-8 m-auto">

              <label
                  htmlFor="wochentag"
                  className="block mt-4 text-sm font-medium text-left text-gray-700"
                >
                  Wochentag
                </label>

                <select name="wochentag" id="wochentag" placeholder="Montag">
                  <option value="1">Montag</option>
                  <option value="2">Dienstag</option>
                  <option value="3">Mittwoch</option>
                  <option value="4">Donnerstag</option>
                  <option value="5">Freitag</option>
                  <option value="6">Samstag</option>
                  <option value="7">Sonntag</option>
                </select>

                <label
                  htmlFor="zeitraum"
                  className="block mt-4 text-sm font-medium text-left text-gray-700"
                >
                  Zeitraum
                </label>

                <select name="zeitraum" id="zeitraum">
                  <option value="9 Uhr">9 Uhr</option>
                  <option value="14 Uhr">14 Uhr</option>
                  <option value="19 Uhr">19 Uhr</option>
              
                </select>


                <br/>
                
                <label
                  htmlFor="phone"
                  className="block mt-4 text-sm font-medium text-left text-gray-700"
                >
                  Wie fühlst du dich gerade?
                </label>

                <select name="cars" id="cars">
                  <option value="volvo">-10 sehr erschöpft</option>
                  <option value="saab">-9</option>
                  <option value="mercedes">-8</option>
                  <option value="audi">-7</option>
                  <option value="audi">-6</option>
                  <option value="audi">-5 erschöpft</option>
                  <option value="audi">-4</option>
                  <option value="audi">-3</option>
                  <option value="audi">-2</option>
                  <option value="audi">-1</option>
                  <option value="audi">0 ausgeglichen</option>
                  <option value="volvo"> 1</option>
                  <option value="saab"> 2</option>
                  <option value="mercedes"> 3</option>
                  <option value="audi"> 4</option>
                  <option value="audi"> 5 energiegeladen</option>
                  <option value="audi"> 6</option>
                  <option value="audi"> 7</option>
                  <option value="audi"> 8</option>
                  <option value="audi"> 9</option>
                  <option value="audi"> 10 sehr energiegeladen</option>
                </select>

                <label
                  htmlFor="phone"
                  className="block mt-4 text-sm font-medium text-left text-gray-700"
                >
                  Wie fühlst du dich körperlich?
                  <br/>
                  <span className="text-gray-500"> -10 = sehr erschöpft  | 0 = ausgeglichen | 10 = sehr energiegeladen </span>
                 
                </label>

                <select name="cars" id="cars">
                  <option value="volvo">-10</option>
                  <option value="saab">-9</option>
                  <option value="mercedes">-8</option>
                  <option value="audi">-7</option>
                  <option value="audi">-6</option>
                  <option value="audi">-5</option>
                  <option value="audi">-4</option>
                  <option value="audi">-3</option>
                  <option value="audi">-2</option>
                  <option value="audi">-1</option>
                  <option value="audi">0 ausgeglichen</option>
                  <option value="volvo"> 1</option>
                  <option value="saab"> 2</option>
                  <option value="mercedes"> 3</option>
                  <option value="audi"> 4</option>
                  <option value="audi"> 5 glücklick</option>
                  <option value="audi"> 6</option>
                  <option value="audi"> 7</option>
                  <option value="audi"> 8</option>
                  <option value="audi"> 9</option>
                  <option value="audi"> 10 sehr glücklich</option>
                </select>

                <label
                  htmlFor="phone"
                  className="block mt-4 text-sm font-medium text-left text-gray-700"
                >
                  Wie ist dein geistiger Zustand in diesem Moment?
                  <br/>
                  <span className="text-gray-500"> -10 = sehr erschöpft  | 0 = ausgeglichen | 10 = sehr energiegeladen </span>
                 
                </label>

                <select name="cars" id="cars">
                  <option value="volvo">-10 sehr abgelenkt</option>
                  <option value="saab">-9</option>
                  <option value="mercedes">-8</option>
                  <option value="audi">-7</option>
                  <option value="audi">-6</option>
                  <option value="audi">-5 abgelenkt</option>
                  <option value="audi">-4</option>
                  <option value="audi">-3</option>
                  <option value="audi">-2</option>
                  <option value="audi">-1</option>
                  <option value="audi">0 ausgeglichen</option>
                  <option value="volvo"> 1</option>
                  <option value="saab"> 2</option>
                  <option value="mercedes"> 3</option>
                  <option value="audi"> 4</option>
                  <option value="audi"> 5 fokussiert</option>
                  <option value="audi"> 6</option>
                  <option value="audi"> 7</option>
                  <option value="audi"> 8</option>
                  <option value="audi"> 9</option>
                  <option value="audi"> 10 sehr fokussiert</option>
                </select>

                <label
                  htmlFor="phone"
                  className="block mt-4 text-sm font-medium text-left text-gray-700"
                >
                  Wie gestresst bist du?
                  <br/>
                  <span className="text-gray-500"> -10 = sehr gestresst  | 0 = ausgeglichen | 10 = sehr tiefenentspannt/relaxed </span>
                 
                </label>

                <select name="cars" id="cars">
                  <option value="volvo">-10</option>
                  <option value="saab">-9</option>
                  <option value="mercedes">-8</option>
                  <option value="audi">-7</option>
                  <option value="audi">-6</option>
                  <option value="audi">-5 abgelenkt</option>
                  <option value="audi">-4</option>
                  <option value="audi">-3</option>
                  <option value="audi">-2</option>
                  <option value="audi">-1</option>
                  <option value="audi">0 ausgeglichen</option>
                  <option value="volvo"> 1</option>
                  <option value="saab"> 2</option>
                  <option value="mercedes"> 3</option>
                  <option value="audi"> 4</option>
                  <option value="audi"> 5 fokussiert</option>
                  <option value="audi"> 6</option>
                  <option value="audi"> 7</option>
                  <option value="audi"> 8</option>
                  <option value="audi"> 9</option>
                  <option value="audi"> 10 sehr fokussiert</option>
                </select>
              
              </div>

              <div className="w-2/3 m-auto mt-1 mb-4">
                
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

              <div className="w-2/3 m-auto mt-1 mb-4">
                
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

              
              <div className="grid w-2/3 m-auto md:grid-cols-2">
                <button
                  type="button"
                  className="px-5 mt-8 mb-2 text-sm font-medium text-center text-white bg-teal-400 rounded-full hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-900 py-2.5"
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

              <section className="w-2/3 m-auto ">
                <ul className="grid pt-8 text-gray-400 border-b border-gray-400 md:grid-cols-2">
                  <li className="pt-4 border-gray-400 md:border-r">
                    Erstellt am
                  </li>
                  <li className="pt-4 pb-2 border-gray-400 md:border-b-0">
                    Stimmung
                  </li>
                </ul>

                <div className="justify-center w-full m-auto text-center">
                  {datenset &&
                    datenset.map((object, index) => {
                      return (
                        <ul
                          key={index}
                          className="grid border-b border-gray-400 md:grid-cols-2"
                        >
                          <li className="pt-4 border-gray-400 md:border-r">
                            {object && object.created_at}
                          </li>
                          <li className="pt-4 pb-2 border-gray-400 md:border-b-0">
                            {object && object.stimmung}
                          </li>
                        </ul>
                      );
                    })}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </>
  );
}
