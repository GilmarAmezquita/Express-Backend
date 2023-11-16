import { Express } from "express"
import groupController from "../controller/group.controller"
import userController from "../controller/user.controller";
import validateSchema from "../middleware/validateSchema.middleware";
import auth from "../middleware/auth.middleware";
import admin from "../middleware/validateAdmin.middleware";
import { userSchema } from "../schemas/user.schema";
import { groupSchema } from "../schemas/group.schema";
import { loginSchema } from "../schemas/login.schema";
import userGroupController from "../controller/userGroup.controller";

const routes = (app: Express) => {
    app.post("/api/v1/login", validateSchema(loginSchema), userController.login);

    app.post("/api/v1/users", validateSchema(userSchema), userController.createUser);
    app.get("/api/v1/users", userController.findAllUsers);
    app.get("/api/v1/users/:id", userController.findUserById);
    app.put("/api/v1/users/:id", auth, validateSchema(userSchema), userController.updateUser);
    app.delete("/api/v1/users/:id", auth, userController.deleteUser);


    app.post("/api/v1/users/:id/groups/:groupId", userGroupController.addUserToGroup);
    app.delete("/api/v1/users/:id/groups/:groupId", userGroupController.removeUserFromGroup);
    app.get("/api/v1/users/:id/groups", auth, userController.listGroupsByUser);

    app.post("/api/v1/groups", validateSchema(groupSchema), groupController.createGroup);
    app.get("/api/v1/groups/:name/users", groupController.listUsersByGroup);
    app.get("/api/v1/groups", auth, groupController.listAllGroupsInfo);
}

export default routes;