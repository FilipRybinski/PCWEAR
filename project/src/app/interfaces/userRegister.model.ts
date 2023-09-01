import { privateDetailAdd } from "./privateDetailAdd.model";
export interface userRegister {
    userName: string;
    userPassword: string;
    email: string;
    personalData: privateDetailAdd;
}