const express = require("express");
const router = express.Router();
const {auth} = require("../middleswares/auth");

const {
    updateProfile,
    userAllDetails,
    updateDisplayPicture
} = require("../controllers/ProfileController");

router.put("/updateprofile",auth,updateProfile);
router.put("/updateDisplayPicture",auth,updateDisplayPicture);
router.get("/getuserdetails",auth,userAllDetails);

module.exports = router;
