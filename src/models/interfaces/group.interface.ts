import { Document, Types } from "mongoose";

export default interface GroupDocument extends Document {
    name: string;
    users: Types.ObjectId[] | Array<{ _id: Types.ObjectId; name: string }>;
    createdAt: Date;
    updatedAt: Date;
}