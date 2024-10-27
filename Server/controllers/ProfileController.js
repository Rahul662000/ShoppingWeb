const User = require("../models/User");
const Profile = require("../models/Profile");
const {uploadImage} = require("../utils/imageUpload");
// const { convertSecondsToDuration } = require("../utils/secToDuration")
// const CourseProgress = require("../models/courseProgress");
// const { default: mongoose } = require("mongoose");
// const Course = require("../models/course")


require("dotenv").config();

exports.updateProfile = async (req,res) => {
    try{
        // get data

        const {firstName="",lastName="",dateOfBirth="",about="",contactNumber="",gender=""} = req.body;

        // validation of data

        if(!contactNumber || !gender)
        {
            return res.status(400).json({
                success:false,
                message:"All fields are Mandatory"
            })
        }

        // user id

        const id = req.user.userId;

        console.log("id" , id)

        // find profile

        const userDetails = await User.findById(id);
        console.log("User Details " , userDetails)
        const profileId = userDetails.additionalDetails;
        console.log("Profile Id " , profileId)
        const profileDetails = await  Profile.findById(profileId);

        console.log("profileDetails" , profileDetails) 

        const user = await User.findByIdAndUpdate(id, {
            firstName,
            lastName,
        })

        await user.save()

        // update profile

        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        profileDetails.gender = gender;

        await profileDetails.save();

        const updatedUserDetails = await User.findById(id)
        .populate("additionalDetails")
        .exec()

        // return response

        return res.status(200).json({
            success:true,
            message:"Profile Updated successfully",
            updatedUserDetails
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to update profile",
            error:error.message,
        })
    }
}

exports.updateDisplayPicture = async (req,res) => {
    try{
        const displayPicture = req.files.displayPicture;
        const userId = req.user.userId;
        const image = await uploadImage(displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000)
        const updateProfile = await User.findByIdAndUpdate({_id:userId},
            {image:image.secure_url},
            {new:true})

        res.send({
            success:true,
            message:"Image Updated successfully",
            data:updateProfile
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.userAllDetails = async (req,res) => {
    try{
        
        // get id

        const id = req.user.userId;

        // find user details

        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            success:true,
            message:"User Data Fetched Successfully",
            data:userDetails
        });

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}