
let twilio = require('twilio');
let client = new twilio('https://qonjmkccfrmtvyqblrdc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvbmpta2NjZnJtdHZ5cWJscmRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAxNzcxNTcsImV4cCI6MTk5NTc1MzE1N30.m5CHW8FBOJvqVKY1bLYOKaBuFgfbku-hRfN1m6DywKg')

cronJob = require('cron').CronJob;

let textJob = new cronJob('0 9 * * *', function(){
    client.messages.create( { to: '+4915221491112', from: '+1 585 595 2499', body: 'https://ba-23-webapp-supabase.netlify.app/'}, function(err, data) {});
}, null, true);