import { Schema, model } from "mongoose";
import GroupDocument from "./interfaces/group.interface";

const GroupSchema = new Schema<GroupDocument>({
    name: {
        type: String,
        required: true
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true, collection: 'groups' });

const Group = model<GroupDocument>('Group', GroupSchema);

export default Group;