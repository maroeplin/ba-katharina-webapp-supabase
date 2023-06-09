const twilio = require("twilio");
const moment = require("moment-timezone");

exports.handler = function (event, context, callback) {
  const accountSid = process.env.NEXT_PUBLIC_TWILIO_SID;
  const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;

  //twilio-account initalisieren
  const client = new twilio(accountSid, authToken);

  //Zeitzone initialisieren
  const tz = "Europe/Berlin";

  //Zeiten, zu denen eine SMS gesendet werden soll
  const schedule = [
    { time: "09:00", numbers: ["+4915221491112", "+4917630785581"] },
    { time: "14:00", numbers: ["+4915221491112", "+4917630785581"] },
    { time: "19:00", numbers: ["+4915221491112", "+4917630785581"] },
    { time: "20:50", numbers: ["+4915221491112", "+4917630785581"] },
    { time: "21:13", numbers: ["+4915221491112", "+4917630785581"] },
    { time: "21:14", numbers: ["+4915221491112", "+4917630785581"] }
  ];

  //aktuelle Zeit bestimmen
  const now = moment().tz("Europe/Berlin");

  //durch den Schedule loopen
  schedule.forEach((item) => {
    const time = moment.tz(`${now.format("YYYY-MM-DD")} ${item.time}`, tz);
    const diff = now.diff(time);

    if(diff >= 0 && diff < 1000 * 60) {
        //Nachricht erstellen
        item.numbers.forEach(number => {
            client.messages.create({
                body: 'Der Link zur Befragung: https://ba-23-webapp-supabase.netlify.app',
                from: process.env.NEXT_PUBLIC_TWILIO_NUMBER,
                to: number,
            }).then(message => {
                console.log(`Nachricht gesendet an ${message.to}`);
            }).catch(error => {
                console.error(`Fehler beim Senden der Nachricht an ${number}: ${error}`);
            });
        });
    }
  });

  // Return a success response
  callback(null, {
    statusCode: 200,
    body: "Messages sent successfully",
  });
};
