require('dotenv').config()

const Twitter = require('twitter');
const client = new Twitter({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token_key:     process.env.TWITTER_TOKEN,
  access_token_secret:  process.env.TWITTER_SECRET
});
const googlehome = require('google-home-notifier');
googlehome.device('Google Home'); // Change to your Google Home name
googlehome.accent('ja'); // optional: 'us'= american voice (default), 'uk'= british voice

client.stream('statuses/filter', {track: '#nseg'}, function(stream) {
  stream.on('data', function(event) {
    console.log(event && event.text);
    if(event){
      googlehome.notify(event.text.replace(/#nseg/g, ''), function(res) {
        console.log(res);
      });
    }
  });

  stream.on('error', function(error) {
    console.error(error);
    //throw error;
  });
});


client.stream('statuses/filter', {track: '#nseg_comment'}, function(stream) {
  stream.on('data', function(event) {
    console.log(event && event.text);
    if(event){
      googlehome.notify(event.text.replace(/#nseg_comment/g, ''), function(res) {
        console.log(res);
      });
    }
  });

  stream.on('error', function(error) {
    console.error(error);
    //throw error;
  });
});


