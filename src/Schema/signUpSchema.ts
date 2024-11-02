import {z} from "zod"

export const usernameValidation=z.
string()
.min(5,"Username should have atleast 5 charecters")
.max(20,"Username cannot have more than 20 characters")
.regex(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,"Username must contain special characters")

export const signUpValidation=z.object({
    username:usernameValidation,
    email:z.string().email({message:"Invalid email"}),
    password:z.string().min(6,{message:"password should be atleast 6 characters"})
})