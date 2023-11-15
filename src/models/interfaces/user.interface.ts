import { Document, Types } from "mongoose";

export default interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    role: "user" | "superadmin";
    groups: Types.ObjectId[] | Array<{ _id: Types.ObjectId; name: string }>;
    createdAt: Date;
    updatedAt: Date;
}