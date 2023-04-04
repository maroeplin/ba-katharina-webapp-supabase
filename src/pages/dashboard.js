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

  const [wochentag, setWochentag] = useState("");
  const [zeitraum, setZeitraum] = useState("");

  //Fragen
  const [frage01, setFrage01] = useState("");
  const [frage02, setFrage02] = useState("");
  const [frage03, setFrage03] = useState("");
  const [frage04, setFrage04] = useState("");

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
          .from("bachelor")
          .select(
            "wochentag, zeitraum, frage01, frage02, frage03, frage04, created_at"
          )
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
  }, [userId, wochentag, zeitraum, frage01, frage02, frage03, frage04]);

  const addNewLink = async () => {
    try {
      if (wochentag) {
        const { data, error } = await supabase.from("bachelor").insert({
          user_id: userId,
          wochentag: wochentag,
          zeitraum: zeitraum,
          frage01: frage01,
          frage02: frage02,
          frage03: frage03,
          frage04: frage04,
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
        <title>Bachelor SoSe 23 / Ka</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="w-auto max-w-md pt-48 m-auto text-center md:max-w-2xl">
          <h1 className="text-4xl font-light">Herzlich Willkommen!</h1>
          <div className="w-2/3 pt-8 pb-6 m-auto text-lg">
            Vielen Dank, dass du an meiner Befragung zu deinem
            Verfassungszustand teilnimmst. Nimm dir bitte drei Mal am Tag die
            Zeit und beantworte folgende Fragen ehrlich.
          </div>
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
              <div className="grid w-2/3 pt-8 m-auto">
                <div className="pb-12">
                  <div className="grid grid-rows-2">
                    <label
                      htmlFor="wochentag"
                      className="block mt-4 text-sm font-medium text-left text-gray-700"
                    >
                      Wochentag
                    </label>

                    <select
                      name="wochentag"
                      id="wochentag"
                      className="border-gray-300 rounded-md"
                      placeholder="Montag"
                      onChange={(e) => setWochentag(e.target.value)}
                    >
                      <option value="Montag">Montag</option>
                      <option value="Dienstag">Dienstag</option>
                      <option value="Mittwoch">Mittwoch</option>
                      <option value="Donnerstag">Donnerstag</option>
                      <option value="Freitag">Freitag</option>
                      <option value="Samstag">Samstag</option>
                      <option value="Sonntag">Sonntag</option>
                    </select>
                  </div>

                  <div className="grid grid-rows-2">
                    <label
                      htmlFor="zeitraum"
                      className="block mt-4 text-sm font-medium text-left text-gray-700"
                    >
                      Zeitraum
                    </label>

                    <select
                      name="zeitraum"
                      id="zeitraum"
                      className="border-gray-300 rounded-md"
                      placeholder="9 Uhr"
                      onChange={(e) => setZeitraum(e.target.value)}
                    >
                      <option value="9 Uhr">9 Uhr</option>
                      <option value="14 Uhr">14 Uhr</option>
                      <option value="19 Uhr">19 Uhr</option>
                    </select>
                  </div>
                </div>

                <div className="pb-12">
                  <label
                    htmlFor="frage01"
                    className="block mt-4 text-sm font-medium text-left text-gray-700"
                  >
                    Wie fühlst du dich gerade?
                  </label>

                  <div className="grid grid-cols-3 pt-4 pb-2 text-gray-600">
                    <div className="text-red-300">-10 = sehr traurig</div>
                    <div className="text-yellow-400">0 = ausgeglichen</div>
                    <div className="text-green-400">10 = glücklich</div>
                  </div>

                  <select
                    name="frage01"
                    id="frage01"
                    className="w-full border-gray-300 rounded-md"
                    onChange={(e) => setFrage01(e.target.value)}
                  >
                    <option value="-10">-10</option>
                    <option value="-9">-9</option>
                    <option value="-8">-8</option>
                    <option value="-7">-7</option>
                    <option value="-6">-6</option>
                    <option value="-5">-5</option>
                    <option value="-4">-4</option>
                    <option value="-3">-3</option>
                    <option value="-2">-2</option>
                    <option value="-1">-1</option>
                    <option value="0">0</option>
                    <option value="1"> 1</option>
                    <option value="2"> 2</option>
                    <option value="3"> 3</option>
                    <option value="4"> 4</option>
                    <option value="5"> 5</option>
                    <option value="6"> 6</option>
                    <option value="7"> 7</option>
                    <option value="8"> 8</option>
                    <option value="9"> 9</option>
                    <option value="10"> 10</option>
                  </select>
                </div>

                <div className="pb-12">
                  <label
                    htmlFor="frage02"
                    className="block mt-4 text-sm font-medium text-left text-gray-700"
                  >
                    Wie fühlst du dich körperlich?
                  </label>

                  <div className="grid grid-cols-3 pt-4 pb-2 text-gray-600">
                    <div className="text-red-300">-10 = sehr traurig</div>
                    <div className="text-yellow-400">0 = ausgeglichen</div>
                    <div className="text-green-400">10 = glücklich</div>
                  </div>

                  <select
                    name="frage02"
                    id="frage02"
                    className="w-full border-gray-300 rounded-md"
                    onChange={(e) => setFrage02(e.target.value)}
                  >
                    <option value="-10">-10</option>
                    <option value="-9">-9</option>
                    <option value="-8">-8</option>
                    <option value="-7">-7</option>
                    <option value="-6">-6</option>
                    <option value="-5">-5</option>
                    <option value="-4">-4</option>
                    <option value="-3">-3</option>
                    <option value="-2">-2</option>
                    <option value="-1">-1</option>
                    <option value="0">0</option>
                    <option value="1"> 1</option>
                    <option value="2"> 2</option>
                    <option value="3"> 3</option>
                    <option value="4"> 4</option>
                    <option value="5"> 5</option>
                    <option value="6"> 6</option>
                    <option value="7"> 7</option>
                    <option value="8"> 8</option>
                    <option value="9"> 9</option>
                    <option value="10"> 10</option>
                  </select>
                </div>

                <div className="pb-12">
                  <label
                    htmlFor="frage03"
                    className="block mt-4 text-sm font-medium text-left text-gray-700"
                  >
                    Wie ist dein geistiger Zustand in diesem Moment?
                  </label>

                  <div className="grid grid-cols-3 pt-4 pb-2 text-gray-600">
                    <div className="text-red-300">-10 = sehr traurig</div>
                    <div className="text-yellow-400">0 = ausgeglichen</div>
                    <div className="text-green-400">10 = glücklich</div>
                  </div>

                  <select
                    name="frage03"
                    id="frage03"
                    className="w-full border-gray-300 rounded-md"
                    onChange={(e) => setFrage03(e.target.value)}
                  >
                    <option value="-10">-10</option>
                    <option value="-9">-9</option>
                    <option value="-8">-8</option>
                    <option value="-7">-7</option>
                    <option value="-6">-6</option>
                    <option value="-5">-5</option>
                    <option value="-4">-4</option>
                    <option value="-3">-3</option>
                    <option value="-2">-2</option>
                    <option value="-1">-1</option>
                    <option value="0">0</option>
                    <option value="1"> 1</option>
                    <option value="2"> 2</option>
                    <option value="3"> 3</option>
                    <option value="4"> 4</option>
                    <option value="5"> 5</option>
                    <option value="6"> 6</option>
                    <option value="7"> 7</option>
                    <option value="8"> 8</option>
                    <option value="9"> 9</option>
                    <option value="10"> 10</option>
                  </select>
                </div>

                <div className="pb-12">
                  <label
                    htmlFor="frage04"
                    className="block mt-4 text-sm font-medium text-left text-gray-700"
                  >
                    Wie gestresst bist du?
                  </label>

                  <div className="grid grid-cols-3 pt-4 pb-2 text-gray-600">
                    <div className="text-red-300">-10 = sehr traurig</div>
                    <div className="text-yellow-400">0 = ausgeglichen</div>
                    <div className="text-green-400">10 = glücklich</div>
                  </div>

                  <select
                    name="frage04"
                    id="frage04"
                    className="w-full border-gray-300 rounded-md"
                    onChange={(e) => setFrage04(e.target.value)}
                  >
                    <option value="-10">-10</option>
                    <option value="-9">-9</option>
                    <option value="-8">-8</option>
                    <option value="-7">-7</option>
                    <option value="-6">-6</option>
                    <option value="-5">-5</option>
                    <option value="-4">-4</option>
                    <option value="-3">-3</option>
                    <option value="-2">-2</option>
                    <option value="-1">-1</option>
                    <option value="0">0</option>
                    <option value="1"> 1</option>
                    <option value="2"> 2</option>
                    <option value="3"> 3</option>
                    <option value="4"> 4</option>
                    <option value="5"> 5</option>
                    <option value="6"> 6</option>
                    <option value="7"> 7</option>
                    <option value="8"> 8</option>
                    <option value="9"> 9</option>
                    <option value="10"> 10</option>
                  </select>
                </div>
              </div>
              <div className="grid w-2/3 pb-8 m-auto md:grid-cols-2">
                <button
                  type="button"
                  className="px-8 py-4 mt-8 mb-4 text-sm font-medium text-center text-white bg-teal-400 rounded-full hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-900"
                  onClick={addNewLink}
                >
                  Eintrag erstellen
                </button>

                <button
                  type="button"
                  className="px-8 py-4 m-auto mt-8 mb-4 text-sm font-medium text-center text-teal-400 border border-teal-400 rounded-full hover:bg-bg-teal-700 focus:outline-none focus:ring-4 focus:ring-bg-teal-200 dark:hover:bg-teal-700 dark:focus:ring-bg-teal-700"
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
                          <dl className="pt-4 border-gray-400 md:border-r">
                            {object && object.created_at}
                          </dl>
                          <dl className="pt-4 pb-2 border-gray-400 md:border-b-0">
                            {object && object.wochentag}
                            <br />
                            {object && object.zeitraum}
                            <br />
                            {object && object.frage01}
                            <br />
                            {object && object.frage02}
                            <br />
                            {object && object.frage03}
                            <br />
                            {object && object.frage04}
                          </dl>
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
