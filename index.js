const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
const cors = require("cors");
const router = require("./routes/router");
const {restartServerJob} = require("./utils/cron");

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());


// Define your routes
app.use(router);

//dummy endpoint 
// app.get('/health', (req, res) => {
//   res.status(200).send('Server is healthy');
// });


connectDB();

restartServerJob.start();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
