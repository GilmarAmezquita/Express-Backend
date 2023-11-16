import UserDTO from "../models/dto/user.dto";
import GroupDocument from "../models/interfaces/group.interface";
import UserDocument from "../models/interfaces/user.interface";
import User from "../models/user.model";
import jwt  from "jsonwebtoken";

class UserService {
    public async createUser(userDTO: UserDTO): Promise<UserDocument> {
        try {
            const user:UserDocument = await User.create(userDTO);
            return user;
        } catch (error) {
            throw error;
        }
    }

    public async findByEmail(email: string): Promise<UserDocument | null> {
        try {
            const user = await User.findOne({ email: email });
            return user;
        } catch (error) {
            throw error;
        }
    }

    public async findById(id: string): Promise<UserDocument | null> {
        try {
            const user = await User.findById(id);
            return user;
        } catch (error) {
            throw error;
        }
    }

    public async findAll(): Promise<UserDocument[]> {
        try {
            const users = await User.find();
            return users;
        } catch (error) {
            throw error;
        }
    }

    public async updateUser(id: string, newData: UserDTO): Promise<UserDocument | null> {
        try {
            const userUpdated = await User.findOneAndUpdate({_id: id}, newData, {new: true});
            return userUpdated;
        } catch (error) {
            throw error;
        }
    }

    public async deleteUserById(id: string): Promise<UserDocument | null> {
        try {
            const deletedUser = await User.findByIdAndDelete(id);
            return deletedUser;
        } catch (error) {
            throw error;
        }
    }

    
    public async addUserToGroup(id: string, groupId: string): Promise<UserDocument | null> {
        try {
            const userUpdated = await User.findOneAndUpdate({_id: id}, {$push: {groups: groupId}}, {new: true});
            return userUpdated;
        } catch (error) {
            throw error;
        }
    }

    public async removeUserFromGroup(id: string, groupId: string): Promise<UserDocument | null> {
        try {
            const userUpdated = await User.findOneAndUpdate({_id: id}, {$pull: {groups: groupId}}, {new: true});
            return userUpdated;
        } catch (error) {
            throw error;
        }
    }

    public async removeGroupFromAllUsers(groupId: string): Promise<void> {
        try {
            await User.updateMany({}, {$pull: {groups: groupId}});
        } catch (error) {
            throw error;
        }
    }

    public async findUserGroups(id: string): Promise<GroupDocument[] | null> {
        try {
            const user = await User.findById(id).populate("groups");
            return user?.groups as GroupDocument[];
        } catch (error) {
            throw error;
        }
    }

    public async authToken(user: UserDocument): Promise<string> {
        try {
            const token = jwt.sign({user_id: user.id, email: user.email, role: user.role}, process.env.JWT_SECRET as string || "secret", {expiresIn: "2h"});
            return token;
        } catch (error) {
            throw error;
        }
    }
}

export default new UserService();