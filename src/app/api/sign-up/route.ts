import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from 'bcryptjs'
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";


export async function POST(request:Request){
    await dbConnect();
    try {
        const {username,email,password}=await request.json()
        const existingUserVerifiedByUsername=await UserModel
        .findOne({username,isVerified:true})

        if(existingUserVerifiedByUsername){
            return Response.json({
                success:false,
                message:"Username already Taken",
              },{
                status:400
              })
        }

        const existingUserByEmail=await UserModel.findOne({email});

        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return Response.json({
                    success:false,
                    message:"Email already exists with some user",
                })
            }else{
                const hashedPassword = await bcrypt.hash(password,15);
                const verifyCode=Math.floor(100000+Math.random()*900000).toString();
                const expiryDate=new Date();
                expiryDate.setHours(expiryDate.getHours()+1);
                existingUserByEmail.password=hashedPassword;
                existingUserByEmail.verifyCode=verifyCode;
                existingUserByEmail.verifyCodeExpiry=expiryDate;
                await existingUserByEmail.save();
                return Response.json({
                    success:true,
                    message:"User registered successfully, Please register the mail",
                },{
                    status:201
                })
            }
        }else{
            const hashedPassword=bcrypt.hash(password,15);
            const expiryDate=new Date();
            expiryDate.setHours(expiryDate.getHours()+1);
            const verifyCode=Math.floor(100000+Math.random()*900000).toString();

            const newUser=new UserModel({
                username,
                email,
                password:hashedPassword,
                verifyCode,
                verifyCodeExpiry:expiryDate,
                isVerified:false,
                isAcceptingMessage:true,
                message:[]
            })

            await newUser.save();

            //send verification email

            const emailResponse=await sendVerificationEmail(
                email,
                username,
                verifyCode
            )

            if(!emailResponse.success){
                return Response.json({
                    success:false,
                    message:"Could not send verification email",
                },{
                    status:500
                })
            }

            return Response.json({
                success:true,
                message:"User registered successfully, Please register the mail",
            },{
                status:201
            })
        }

    } catch (error) {
        console.error("Error in Registering user: ",error);
        return Response.json({
            success:false,
            message:"Error in registering User"
        },{
            status:500
        })
    }
}