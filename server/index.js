const express = require("express");
const app = express();
const connectDB = require("./configs/mongodb.config");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const cors=require('cors');
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

dotenv.config();

const userRouter = require('./routes/user');
const assess_voiceRouter=require('./routes/assess-voice')
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));

app.get("/getFile", (req, res) => {
    const results = [];
  
    fs.createReadStream(path.join(__dirname, "sample.csv"))
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        res.json(results); // Send the JSON result to the frontend
      })
      .on("error", (error) => {
        res.status(500).send(error.message); // Handle any errors
      });
  });

app.use('/user',userRouter);
app.use('/trainee',assess_voiceRouter);

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server started at port ${PORT}`);
    });
}).catch((error)=>{
    console.log("error while starting the server");
    console.log(error);
});