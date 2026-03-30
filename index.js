const express = require("express")
const mongoose = require("mongoose")
const { connectToMongoDB } = require("./connection")
const port = 8001
const URL = require("./models/url")
const urlRoute = require("./routes/url")

const app = express()

connectToMongoDB("mongodb://localhost:27017/short-url").then(() => {
    console.log("MongoDB Connected");

})
app.use(express.json())
app.use("/url", urlRoute)
app.get("/:shortId", async (req, res) => {
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