const User = require("../models/user")
const {v4: uuidv4} = require("uuid")
const {setUser} =  require("../service/auth")


async function createUserSignUp(req,res){
    const {name, email, password} = req.body
    if(name, email, password)
        await User.create({
    name,
    email,
    password
    })
    return res.redirect("/")
}

async function createUserLogin(req,res){
    const {email, password} = req.body
    const user = await User.findOne({email, password})

    if(!user) return res.render("login", {
        error: "Invalid credentials"
    })
    const sessionId = uuidv4()
    setUser(sessionId, user)
    res.cookie("uid", sessionId)
    return res.redirect("/")
}

module.exports ={
    createUserSignUp,
    createUserLogin
}