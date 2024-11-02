import {z} from "zod"

const messageSchema=z.object({
    content:z.string()
    .min(10,{message:"The message should have atleast 10 characters"})
    .max(300,{message:"The message cannot have more than 300 characters"})
})