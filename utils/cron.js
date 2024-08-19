const cron = require('cron');
const https = require('https');

const backendUrl = "https://ecommerce-mern-backend-mtnf.onrender.com/";
const restartServerJob = new cron.CronJob('*/14 * * * *', () => {
  console.log("Restarting Server");

  https
    .get(backendUrl, (res) => {
      if (res.statusCode === 200) {
        console.log("Server Restarted");
      } else {
        console.error(
          `Failed to restart server with status code: ${res.statusCode}`
        );
      }
    })
    .on("error", (err) => {
      console.error(`Error during restart:`, err.message);
    });
});

module.exports = {
  restartServerJob
};
