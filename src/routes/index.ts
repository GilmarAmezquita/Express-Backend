import { Express } from "express"
import groupController from "../controller/group.controller"
import userController from "../controller/user.controller";
import validateSchema from "../middleware/validateSchema.middleware";
import { userSchema } from "../schemas/user.schema";
import auth from "../middleware/auth.middleware";

const routes = (app: Express) => {
    app.post("/api/v1/login", userController.login)

    app.post("/api/v1/users", validateSchema(userSchema), userController.createUser);
    app.get("/api/v1/users", userController.findAllUsers);
    app.get("/api/v1/users/:id", userController.findUserById);
    app.put("/api/v1/users/:id", auth("user"), validateSchema(userSchema), userController.updateUser);
    app.delete("/api/v1/users/:id", auth("superadmin"), userController.deleteUser);

    app.post("/api/v1/groups", groupController.createGroup);
}

export default routes;