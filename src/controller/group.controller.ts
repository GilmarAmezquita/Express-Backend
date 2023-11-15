import { Request, Response } from "express";
import GroupDocument from "../models/interfaces/group.interface";
import groupService from "../services/group.service";
import GroupDTO from "../models/dto/group.dto";

class GroupController {
    public async createGroup(req: Request, res: Response): Promise<Response> {
        try {
            const group: GroupDocument = await groupService.createGroup(req.body as GroupDTO);
            return res.status(201).json(group);
        } catch (error) {
            throw res.status(500).json(error);
        }
    }
}

export default new GroupController();