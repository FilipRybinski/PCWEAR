import { postalDetails } from "./postalData.model";
import { personalData } from "./personalData.model";
export interface user {
    userName:string,
    userPassword:string,
    userPasswordConfirmed:string,
    email:string,
    postalDetails:postalDetails,
    personalData:personalData
}