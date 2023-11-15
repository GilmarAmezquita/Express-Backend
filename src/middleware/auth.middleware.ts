import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const auth = (role: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            let token = req.headers.authorization;
            if (!token) {
                return res.status(401).json({message: "Not Authorized"})
            }
            token = token.replace('Bearer ','');
            const decoded:any = jwt.verify(token, process.env.JWT_SECRET || "secret");
            if (!decoded) {
                return res.status(401).json({message: "Not Authorized"})
            }
            if (role === "user" && (decoded.role === "user" || decoded.role === "superadmin")) {
                req.body.loggedUser = decoded
                return next()
            }
            if (role === "superadmin" && decoded.role === "superadmin") {
                req.body.loggedUser = decoded
                return next()
            }
            return res.status(401).json({message: "Not Authorized"})
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default auth;