const express = require("express");
const authRoutes = express.Router();

const {signUp , logIn} = require("../controllers/AuthControllers")

authRoutes.post("/signup",signUp);
authRoutes.post("/login",logIn);

module.exports = authRoutes;