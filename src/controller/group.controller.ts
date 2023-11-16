import { Request, Response } from "express";
import GroupDocument from "../models/interfaces/group.interface";
import groupService from "../services/group.service";
import GroupDTO from "../models/dto/group.dto";

class GroupController {
    public async createGroup(req: Request, res: Response): Promise<Response> {
        try {
            const groupExists = await groupService.findByName(req.body.name);
            if (groupExists) {
                return res.status(400).json({ message: "Group already exists" });
            }
            const group: GroupDocument = await groupService.createGroup(req.body as GroupDTO);
            return res.status(201).json(group);
        } catch (error) {
            throw res.status(500).json("Group could not be created");
        }
    }

    public async listAllGroupsInfo(req: Request, res: Response): Promise<Response> {
        try {
            const groups = await groupService.findAllExtended();
            return res.status(200).json(groups);
        } catch (error) {
            throw res.status(500).json("Groups could not be listed");
        }
    }

    public async listUsersByGroup(req: Request, res: Response): Promise<Response> {
        try {
            const group = await groupService.findUsersOfGroup(req.params.name);
            if (!group) {
                return res.status(404).json({ message: "Group not found" });
            }
            return res.status(200).json(group);
        } catch (error) {
            throw res.status(500).json("Group could not be listed");
        }
    }
}

export default new GroupController();