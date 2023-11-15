import { Schema, model } from 'mongoose';
import UserDocument from './interfaces/user.interface';

const UserSchema = new Schema<UserDocument>({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'superadmin'],
        default: 'user'
    },
    groups: [{
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }]
}, {timestamps: true, collection: 'users'});

const User = model<UserDocument>('User', UserSchema);

export default User;