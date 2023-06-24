const express = require ('express');
const mongoose = require ('mongoose')    //Importing Mongoose for DB
const cors = require('cors');           //Connecting the frontend and backend
const route = require ("./Route/index");
//const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const paymentRoutes = require("./Controllers/payment");
const passport = require("passport");
const cookieSession = require("cookie-session");
const authRoute = require("./Controllers/auth");
const passportSetup = require("./Controllers/passport");

dotenv.config();

const Port = process.env.PORT || 5500;
const hostname = 'localhost';
const atlasDbUrl = 'mongodb+srv://Sucharita7:UJtNT36T8nBmunJb@cluster0.6fe6e9q.mongodb.net/Zomato-76?retryWrites=true&w=majority';  //MongoDb Atlas Connection Url

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}

const app = express();

app.use(cookieSession({ name: "session", keys:["edureka"], maxAge:24*60*60*1000 }));
    // 24 hours*60 minutes*60 secs*1000 ms 

//app.use(bodyParser.json());     // in 4.4 above version of express we don't need body-parser anymore
app.use(cors(corsOptions));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', route);
app.use("/api/payment", paymentRoutes);
app.use("/auth", authRoute);

mongoose.connect(atlasDbUrl, {                      //Creating a MongoDB Connection
    useNewUrlParser: true, useUnifiedTopology: true          //Creating a new connection with DB and using the MongoDB Driver's connection management engine
})

    .then(res => {
        app.listen(Port, hostname, () => {
            console.log(`Server is running at ${hostname}: ${Port}`)
        });
    })
    .catch(err => console.log(err));
