const express = require("express");
const authRoutes = express.Router();

const {signUp , logIn, logOut} = require("../controllers/AuthControllers")

authRoutes.post("/signup",signUp);
authRoutes.post("/login",logIn);
authRoutes.post("/logout",logOut);

module.exports = authRoutes;