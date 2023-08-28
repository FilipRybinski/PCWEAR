import { user } from "./user.model";

export interface privateDetail {
    id?: number;
    name?: string;
    surname?: string;
    phoneNumber?: string;
    userId?: number;
    user?: user;
}