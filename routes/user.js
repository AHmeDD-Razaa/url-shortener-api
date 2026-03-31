const express = require("express")
const {createUserSignUp, createUserLogin} = require("../controllers/user")

const router = express.Router()
router.post("/", createUserSignUp)
router.post("/login", createUserLogin)

module.exports = router;