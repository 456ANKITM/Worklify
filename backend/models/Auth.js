import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const authSchema = new mongoose.Schema({
    email:{type:String,required:true,unique:true,trim:true},
    password:{type:String,required:true,minLength:6},
    role:{
        type:String,
        enum:["client", "freelancer"],
        required:true
    }
},{timestamps:true})

authSchema.pre("save", async function(){
    if(!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

authSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const Auth = mongoose.model("Auth", authSchema);

export default Auth;
