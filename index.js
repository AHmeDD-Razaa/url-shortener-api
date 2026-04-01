const express = require("express")
const mongoose = require("mongoose")
const { connectToMongoDB } = require("./connection")
const port = 8001
const URL = require("./models/url")
const path = require("path")
const cookieParser = require("cookie-parser")
const {checkForAuthentication, restrictTo} = require("./midddlewares/auth")

const urlRoute = require("./routes/url")
const staticRoute = require("./routes/staticRouter")
const userRoute = require("./routes/user")

const app = express()

connectToMongoDB("mongodb://localhost:27017/short-url").then(() => {
    console.log("MongoDB Connected");

})

app.set("view engine","ejs")
app.set("views", path.resolve("./views")) 

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(checkForAuthentication)

app.use("/url", restrictTo(["Normal","Admin"]),  urlRoute)
app.use("/",   staticRoute)
app.use("/user", userRoute)

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate(
        {
        shortId,
    }, 
    {
        $push: {
            visitHistory: { timestamp: Date.now() }
        }
    })
    res.redirect(entry.redirectUrl)
})
app.listen(port, () => {
    console.log("Server started at port:", port);
})