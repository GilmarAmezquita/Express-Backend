import GroupDTO from "../models/dto/group.dto";
import Group from "../models/group.model";
import GroupDocument from "../models/interfaces/group.interface";
import UserDocument from "../models/interfaces/user.interface";

class GroupService {
    public async createGroup(groupDTO: GroupDTO): Promise<GroupDocument> {
        try {
            const group:GroupDocument = await Group.create(groupDTO);
            return group;
        } catch (error) {
            throw error;
        }
    }

    public async findByName(name: string): Promise<GroupDocument | null> {
        try {
            const group = await Group.findOne({name: name});
            return group;
        } catch (error) {
            throw error;
        }
    }

    public async findById(id: string): Promise<GroupDocument | null> {
        try {
            const group = await Group.findById(id);
            return group;
        } catch (error) {
            throw error;
        }
    }

    public async findAll(): Promise<GroupDocument[]> {
        try {
            const groups = await Group.find();
            return groups;
        } catch (error) {
            throw error;
        }
    }

    public async findAllExtended(): Promise<GroupDocument[]> {
        try {
            const groups = await Group.find().populate("users");
            return groups;
        } catch (error) {
            throw error;
        }
    }

    public async updateGroup(id: string, newData: GroupDTO): Promise<GroupDocument | null> {
        try {
            const groupUpdated = await Group.findByIdAndUpdate({_id: id}, newData, {new: true});
            return groupUpdated;
        } catch (error) {
            throw error;
        }
    }

    public async addUserToGroup(groupId: string, userId: string): Promise<GroupDocument | null> {
        try {
            const groupUpdated = await Group.findByIdAndUpdate({_id: groupId}, {$push: {users: userId}}, {new: true});
            return groupUpdated;
        } catch (error) {
            throw error;
        }
    }

    public async removeUserFromGroup(groupId: string, userId: string): Promise<GroupDocument | null> {
        try {
            const groupUpdated = await Group.findByIdAndUpdate({_id: groupId}, {$pull: {users: userId}}, {new: true});
            return groupUpdated;
        } catch (error) {
            throw error;
        }
    }

    public async findUsersOfGroup(name: string): Promise<UserDocument[] | null> {
        try {
            const group = await Group.findOne({name: name}).populate("users");
            return group?.users as UserDocument[];
        } catch (error) {
            throw error;
        }
    }

    public async deleteGroup(id: string): Promise<GroupDocument | null> {
        try {
            const groupDeleted = await Group.findByIdAndDelete(id);
            return groupDeleted;
        } catch (error) {
            throw error;
        }
    }
}

export default new GroupService();