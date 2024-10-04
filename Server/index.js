const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
const PORT = process.env.PORT || 4000;

app.use(express.json()); // This middleware is used to parse incoming requests that contain JSON payloads. It converts the JSON data into a JavaScript object and makes it available in req.body.
app.use(cookieParser()); // This adds the cookieParser middleware to your Express app, which allows you to easily access cookies in req.cookies. It helps in handling HTTP cookies sent by the browser.

app.get("/",(req,res)=>{
    // res.send(`<h1>Welcome</h1>`);
    return res.json(
        {
            success:true,
            message:"Your server is up and Running",
            htmlContent : "<h1>Welcome</h1>"
        }
    )
});

app.listen(PORT,(req,res)=>{
    console.log(`App Running Successfully at port : ${PORT}`);
})  