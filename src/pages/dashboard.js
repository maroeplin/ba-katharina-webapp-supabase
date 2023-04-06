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

  const [wochentag, setWochentag] = useState(null);
  const [zeitraum, setZeitraum] = useState(null);

  //Fragen
  const [frage01, setFrage01] = useState(null);
  const [frage02, setFrage02] = useState(null);
  const [frage03, setFrage03] = useState(null);
  const [frage04, setFrage04] = useState(null);
  const [bemerkung, setBemerkung] = useState(null);

  //in den folgenden Hook kommt das object aus der Datenbank
  const [datenset, setDatenset] = useState([]);
  //Feedback bei erstelltem Eintrag
  const [feedback, setFeedback] = useState(false);
  const [missing, setMissing] = useState(false);

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
          .from('bachelor')
          .select(
            'wochentag, zeitraum, frage01, frage02, frage03, frage04, bemerkung, created_at'
          )
          .eq('user_id', userId);

        if (error) throw error;

        console.log("data: ", data);
        setDatenset(data.reverse());
      } catch (error) {
        console.log("error: ", error);
      }
    };
    if (userId) {
      getLinks();
    }
    //sobald sich der Value in den brackets von useEffect ändert, wird der Code Block darüber ausgeführt (der Block wird jedes Mal recalled)
  }, [userId, wochentag, zeitraum, frage01, frage02, frage03, frage04, bemerkung]);


  const validateForm = () => {
    if(!wochentag || !zeitraum || !frage01 || !frage02 || !frage03 || !frage04) {
      setMissing(true);
    } else {
      setMissing(false);
      return true;
    }
  };
  
  const addNewLink = async (event) => {
    event.preventDefault();
    const isValid = validateForm();
    if(isValid) {
    try {

        const { data, error } = await supabase.from("bachelor").insert({
          user_id: userId,
          wochentag: wochentag,
          zeitraum: zeitraum,
          frage01: frage01,
          frage02: frage02,
          frage03: frage03,
          frage04: frage04,
          bemerkung: bemerkung
        });
        if(!wochentag && !zeitraum && !frage01 && !frage02 && !frage03 && !frage04) {
          setMissing(true);
        };
        if (error) throw error;
        console.log("data", data);
        if (datenset) {
          setDatenset([data, ...datenset]);
          setFeedback(true);
        }
      
    } catch (error) {
      console.log("error", error);
    }
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
        <div className="w-auto max-w-md pt-24 m-auto text-center md:max-w-2xl">
          <h1 className="text-4xl font-light">Herzlich Willkommen!</h1>
          <div className="w-2/3 pt-8 pb-6 m-auto text-md md:text-lg">
          Danke, dass du an meiner Befragung zu deinem Verfassungszustand teilnimmst. Nimm dir bitte die Zeit, um dich mit deiner Verfassung auseinanderzusetzen und beantworte alle Fragen ehrlich. <br/> <br/> Im letzten Feld hast du Raum für zusätzliche Anmerkungen. 
Alle deine Einträge werden im unteren Bereich der Anwendung archiviert.
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
                      className="block mt-4 font-medium text-left text-black text-md"
                    >
                      Wochentag
                    </label>

                    <select
                      name="wochentag"
                      id="wochentag"
                      className="border-gray-300 rounded-md bg-gray-50 focus:ring-teal-600 focus:border-teal-500 "
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
                      className="block mt-4 font-medium text-left text-black text-md "
                    >
                      Zeitraum
                    </label>

                    <select
                      name="zeitraum"
                      id="zeitraum"
                      className="border-gray-300 rounded-md bg-gray-50 focus:ring-teal-600 focus:border-teal-500 "
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
                    className="block mt-4 text-lg font-medium text-left text-black"
                  >
                    Wie fühlst du dich gerade?
                  </label>

                  <div className="grid grid-cols-3 pb-2 text-gray-800">
                    <div>-10 = sehr traurig</div>
                    <div>0 = ausgeglichen</div>
                    <div>10 = sehr glücklich</div>
                  </div>

                  <select
                    name="frage01"
                    id="frage01"
                    className="w-full border-gray-300 rounded-md bg-gray-50 focus:ring-teal-600 focus:border-teal-500 "
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
                    className="block mt-4 text-lg font-medium text-left text-black-700"
                  >
                    Wie fühlst du dich körperlich?
                  </label>

                  <div className="grid grid-cols-3 pb-2 text-gray-800">
                    <div>-10 = sehr erschöpft</div>
                    <div>0 = ausgeglichen</div>
                    <div>10 = sehr energiegeladen</div>
                  </div>

                  <select
                    name="frage02"
                    id="frage02"
                    className="w-full border-gray-300 rounded-md bg-gray-50 focus:ring-teal-600 focus:border-teal-500 "
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
                    className="block mt-4 text-lg font-medium text-left text-black"
                  >
                    Wie ist dein geistiger Zustand in diesem Moment?
                  </label>

                  <div className="grid grid-cols-3 pb-2 text-gray-800">
                    <div>-10 = sehr ausgeglichen</div>
                    <div>0 = ausgeglichen</div>
                    <div>10 = sehr unkonzentriert</div>
                  </div>


                  <div className="grid grid-cols-3 text-gray-600"></div>

               
                  <select
                    name="frage03"
                    id="frage03"
                    className="w-full border-gray-300 rounded-md bg-gray-50 focus:ring-teal-600 focus:border-teal-500 "
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
                    className="block mt-4 text-lg font-medium text-left text-black"
                  >
                    Wie gestresst bist du?
                  </label>

                  
                  <div className="grid grid-cols-3 pb-2 text-gray-800">
                    <div>-10 = sehr gestresst</div>
                    <div>0 = ausgeglichen</div>
                    <div>10 = sehr entspannt</div>
                  </div>

                  <select
                    name="frage04"
                    id="frage04"
                    className="w-full border-gray-300 rounded-md bg-gray-50 focus:ring-teal-600 focus:border-teal-500 "
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

                <div className="pb-8">
                <label
                    htmlFor="frage04"
                    className="block pb-2 mt-4 text-lg font-medium text-left text-black"
                  >
                    Hier ist Platz für deine persönlichen Bemerkungen:
                  </label>
                  
                  <textarea type="text" name="bemerkung"
                    id="frage04"
                    placeholder="Deine persönlichen Bemerkungen..."
                    className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-600 focus:border-teal-500   pb-12"
                    onChange={(e) => setBemerkung(e.target.value)}
                    ></textarea>
                </div>
                
              </div>
              
              {missing ? (
                  <h1 className="w-2/3 px-2 pt-2 pb-2 m-auto mt-2 font-semibold text-white bg-red-500 rounded-lg ">
                  Bitte alle Optionsfelder einzeln auswählen und danach erneut versuchen. Die persönlichen Bemerkungen sind nicht notwendig.
                </h1>
              ) : null}

              {feedback ? (
                <h1 className="w-2/3 pt-2 pb-2 m-auto mt-2 font-semibold text-white rounded-lg bg-lime-500">
                  Der Eintrag wurde erstellt.
                </h1>
              ) : null}

              
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

          
        

              <section className="w-2/3 m-auto mt-8 ">
                <ul className="text-gray-400">
                  <li className="pt-4 pb-2 border-gray-400 ">
                    Deine Einträge
                  </li>
                </ul>

                <div className="justify-center w-full m-auto text-center">
                  {datenset &&
                    datenset.map((object, index) => {
                      return (
                        <ul
                          key={index}
                          className="grid pl-4 pr-4 mt-4 text-black border border-teal-700 rounded-xl"
                        >
                          <dl className="pt-4 text-left border-gray-400 ">
                            <dd className="pt-2 pb-2 text-center ">{object && object.created_at}</dd>
                            <dd className="pt-2 pb-2 font-bold">Wochentag</dd>
                            <dt className="pt-2 pb-2 mb-4 border-b">
                              {object && object.wochentag}
                            </dt>

                            <dd className="pt-2 pb-2 ">Zeitraum</dd>
                            <dd className="pt-2 pb-2 mb-4">
                              {object && object.zeitraum}
                            </dd>

                            <dd className="pt-2 pb-2 ">
                              Wie fühlst du dich gerade?
                            </dd>
                            <dd className="pt-2 pb-2 mb-4">
                              {object && object.frage01}
                            </dd>

                            <dd className="pt-2 pb-2 ">
                              Wie fühlst du dich körperlich?
                            </dd>
                            <dd className="pt-2 pb-2 mb-4">
                              {object && object.frage02}
                            </dd>

                            <dd className="pt-2 pb-2 ">
                              Wie ist dein geistiger Zustand in diesem Moment?
                            </dd>
                            <dd className="pt-2 pb-2 mb-4">
                              {object && object.frage03}
                            </dd>

                            <dd className="pt-2 pb-2 ">
                              Wie gestresst bist du?
                            </dd>
                            <dd className="pt-2 pb-2 mb-4">
                              {object && object.frage04}
                            </dd>
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
