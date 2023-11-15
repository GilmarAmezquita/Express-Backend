import { Request, Response } from "express";
import userService from "../services/user.service";
import UserDocument from "../models/interfaces/user.interface";
import UserDTO from "../models/dto/user.dto";
import bcrypt from "bcrypt";

class UserController {
    public async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const userExists = await userService.findByEmail(req.body.email);
            if (userExists) {
                return res.status(400).json({ message: "User already exists" });
            }
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const user: UserDocument = await userService.createUser(req.body as UserDTO);
            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json("User could not be created");
        }
    }

    public async findUserById(req: Request, res: Response): Promise<Response> {
        try {
            const user = await userService.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json("User could not be listed");
        }
    }

    public async findUserByEmail(req: Request, res: Response): Promise<Response> {
        try {
            const user = await userService.findByEmail(req.params.email);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json("User could not be listed");
        }
    }

    public async findAllUsers(req: Request, res: Response): Promise<Response> {
        try {
            const users = await userService.findAll();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json("Users could not be listed");
        }
    }

    public async updateUser(req: Request, res: Response): Promise<Response> {
        try {
            const user = await userService.updateUser(req.params.id, req.body as UserDTO);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json("User could not be updated");
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<Response> {
        try {
            const user = await userService.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: "User not exists" });
            }
            await userService.deleteUserById(req.params.id);
            return res.status(204).json();
        } catch (error) {
            return res.status(500).json("User could not be deleted");
        }
    }

    public async login(req: Request, res: Response): Promise<Response> {
        try {
            const user: UserDocument | null = await userService.findByEmail(req.body.email);
            if (!user) {
                return res.status(401).json({ message: "Email not found" });
            }
            const passwordMatch = await bcrypt.compare(req.body.password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            const token = await userService.authToken(user);
            return res.status(200).json({ token });
        } catch (error) {
            return res.status(500).json("Internal Server Error");
        }
    }
}

export default new UserController();