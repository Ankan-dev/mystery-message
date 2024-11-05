import {Message} from '../model/User'

export interface ApiResponseTypes{
    success:boolean;
    message:string;
    isAcceptingMessage?:boolean;
    messages?:Array<Message>
}