import GroupDTO from "../models/dto/group.dto";
import Group from "../models/group.model";
import GroupDocument from "../models/interfaces/group.interface";

class GroupService {
    public async createGroup(groupDTO: GroupDTO): Promise<GroupDocument> {
        try {
            const group:GroupDocument = await Group.create(groupDTO);
            return group;
        } catch (error) {
            throw error;
        }
    }
}

export default new GroupService();