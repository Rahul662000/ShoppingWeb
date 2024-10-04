const { compare } = require("bcrypt");
const user = require("../models/User")
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (email , userId) => {
    return jwt.sign({email, userId} , process.env.JWT_KEY,{expiresIn:maxAge})
}

exports.signUp = async(req,res,next) => {
    try{

        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
        } = req.body;

        if(!firstName || !lastName || !email || !password || !confirmPassword || !accountType){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password & Confirm Password Do not Match"
            })
        }

        const existingUser = await user.findOne({email});
        if(existingUser)
        {
            return res.status(400).json({
                success:false,
                message:"User Already exists"
            });
        }

        // const profileDetails = await Profile.create({
        //     gender:null,
        //     dateOfBirth:null,
        //     about:null,
        //     contactNumber:null,
        // }) 

        const userDB = await user.create({
            firstName,
            lastName,
            email,
            password,
            // contactNumber,
            accountType:accountType,
            // additionalDetails:profileDetails._id, 
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        const token = createToken(email,userDB.id)

        userDB.password = undefined;

        res.cookie("jwt", token, {
            maxAge,
            secure: true, // Use secure cookies only in production
            sameSite: "None"
        });

        return res.status(200).json({
            success:true,
            message:"User is Registered",
            token,
            user: userDB
        });


    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registred please try again"
        })
    }
}

exports.logIn = async(req,res,next) => {
    try{

        const {
            email , password
        } = req.body;

        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            });
        }

        const existUser = await user.findOne({email}) //.populate("additionalDetails");

        if(!existUser){
            return res.status(401).json({
                success:false,
                message:"User is Not Registred,please Sign Up"
            })
        }

        const auth = await compare(password , existUser.password);

        if(!auth){
            return res.status(400).json({
                success: false,
                message: "Password is incorrect"
            });
        }

        const token = createToken(email,existUser.id)

        existUser.token = token;
        existUser.password = undefined;

        res.cookie("token", token, {
            maxAge,
            secure: true,  // Conditionally use secure cookies
            sameSite: "None"
        });

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token,
            user: existUser
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Loggin Failue Try Again"
        })
    }
}