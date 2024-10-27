const mongoose = require("mongoose");
const {genSalt, hash } =  require("bcrypt")

const userSchema = new mongoose.Schema({
    firstName : {
        type:String,
        required:true,
        trim:true,
    },
    lastName : {
        type:String,
        required:true,
        trim:true,
    },
    email : {
        type:String,
        required:true,
        trim:true,
    },
    password : {
        type:String,
        required:true
    },
    accountType : {
        type:String,
        enum : ["Admin","Buyer","Seller"],
        required:true
    },
    additionalDetails : {
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"Profile"
    },
    // purchaseHistory: [{
    //     type:mongoose.Schema.ObjectId,
    //     ref:"OrderHistory"
    // }],
    image : {
        type:String,
        required:true,
    },
    token:{
        type:String,
    },
    // resetPasswordExpires:{
    //     type:Date,
    // },

    },    // Add timestamps for when the document is created and last modified

    {timestamps:true}

);

// userSchema.pre("save" , async function(next){
//     const salt = await genSalt();
//     this.password = await hash(this.password , salt);
//     next();
// });   {/* Premiddle ware work before saving the data we need to run this function */}

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next(); // Prevents re-hashing
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
    next();
});

module.exports = mongoose.model("User",userSchema);