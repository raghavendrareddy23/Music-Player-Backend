const cron = require('cron');
const https = require('https');

// Replace with a valid endpoint that exists in your backend
const backendUrl = "https://music-player-backend-3xoo.onrender.com/health";

const restartServerJob = new cron.CronJob('*/14 * * * *', () => {
  console.log("Restarting Server");

  https
    .get(backendUrl, (res) => {
      let data = '';

      // A chunk of data has been received.
      res.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received.
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log("Server Restarted");
        } else {
          console.error(
            `Failed to restart server with status code: ${res.statusCode}. Response: ${data}`
          );
        }
      });
    })
    .on("error", (err) => {
      console.error(`Error during restart:`, err.message);
    });
});

module.exports = {
  restartServerJob
};
