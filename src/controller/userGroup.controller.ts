import { Request, Response } from "express";
import userService from "../services/user.service";
import groupService from "../services/group.service";

class UserGroupController {
    public async addUserToGroup(req: Request, res: Response): Promise<Response> {
        try {
            const user = await userService.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const group = await groupService.findById(req.params.groupId);
            if (!group) {
                return res.status(404).json({ message: "Group not found" });
            }
            if (user.groups.includes(group._id)) {
                return res.status(400).json({ message: "User already in group" });
            }
            await groupService.addUserToGroup(req.params.groupId, req.params.id);
            const userUpdated = await userService.addUserToGroup(req.params.id, req.params.groupId);
            return res.status(200).json(userUpdated);
        } catch (error) {
            return res.status(500).json("User could not be added to group");
        }
    }

    public async removeUserFromGroup(req: Request, res: Response): Promise<Response> {
        try {
            const user = await userService.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const group = await groupService.findById(req.params.groupId);
            if (!group) {
                return res.status(404).json({ message: "Group not found" });
            }
            if (!user.groups.includes(group._id)) {
                return res.status(400).json({ message: "User not in group" });
            }
            await groupService.removeUserFromGroup(req.params.groupId, req.params.id);
            const userUpdated = await userService.removeUserFromGroup(req.params.id, req.params.groupId);
            return res.status(200).json(userUpdated);
        } catch (error) {
            return res.status(500).json("User could not be removed from group");
        }
    }
}

export default new UserGroupController();