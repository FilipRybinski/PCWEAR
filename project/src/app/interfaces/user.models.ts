import { postalData } from "./postalData.model";
import { personalData } from "./personalData.model";
export interface User {
    userName: string,
    userPassword: string,
    userPasswordConfirmed: string,
    email: string,
    postalDetails: postalData,
    personalData: personalData
}