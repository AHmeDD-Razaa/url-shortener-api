const express = require("express")
const URL = require("../models/url")
const { restrictTo } = require("../midddlewares/auth")

const router = express.Router()
router.get("/", restrictTo(["Normal","Admin"]), async (req,res) =>{
    const allUrls = await URL.find({createdBy: req.user._id})
    return res.render("home",{
        urls:allUrls,
    })
})

router.get("/admin/urls", restrictTo(["Admin"]), async (req,res) =>{
    const allUrls = await URL.find({})
    return res.render("home",{
        urls:allUrls,
    })
})


router.get("/signup",  async (req,res) =>{
    return res.render("signup")
})
router.get("/login", async (req,res) =>{
    return res.render("login")
})

module.exports = router