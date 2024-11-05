import { resend } from "../lib/resend";
import {Email} from "../../emails/VerificationEmail";
import { ApiResponseTypes } from "@/types/ApiResponseType";

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string
):Promise<ApiResponseTypes>{
    try{
        await resend.emails.send({
            from: 'you@example.com',
            to: email,
            subject: 'This the email for your verification',
            react: Email({username,otp:verifyCode})
          });
          return{
            success:true,
            message:"Email has been send successfully"
          }
    }catch(error){
        console.log("Error in sending the verification email: ",error);
        return {
            success:false,
            message:"Failed to send the verification email"
        }
    }
}