import mongoose, { Schema, Document, Model } from "mongoose";

export interface Message extends Document {
    content: string;
    createdAt: Date;
}

const messageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isVerified:boolean;
    isAcceptingMessage:boolean;
    message:Message[]
}

const userSchema:Schema<User>=new Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        match:[/.+\@.+\..+/,'please enter a valid email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    verifyCode:{
        type:String,
        required:[true,"password is required"]
    },
    verifyCodeExpiry:{
        type:Date,
        required:true,
        default:Date.now
    },
    isVerified:{
        type:Boolean,
        required:true
    },
    isAcceptingMessage:{
        type:Boolean,
        required:true,
        default:true
    },
    message:[messageSchema]
})

const UserModel=(mongoose.models.User as mongoose.Model<User>) || 
(mongoose.model<User>("User",userSchema));
export default UserModel;