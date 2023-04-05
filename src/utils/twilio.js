
let twilio = require('twilio');
let client = new twilio(process.env.NEXT_PUBLIC_SUBAPASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON)

cronJob = require('cron').CronJob;

let textJob = new cronJob('0 23 * * *', function(){
    client.messages.create( { to: '+4915221491112', from: '+1 585 595 2499', body: 'Hallo. Bitte rufe die Webapp auf und erstelle einen Eintrag. Danke'}, function(err, data) {});
}, null, true);