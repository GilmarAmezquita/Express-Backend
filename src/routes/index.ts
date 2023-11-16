import { Express } from "express"
import groupController from "../controller/group.controller"
import userController from "../controller/user.controller";
import validateSchema from "../middleware/validateSchema.middleware";
import auth from "../middleware/auth.middleware";
import admin from "../middleware/validateAdmin.middleware";
import { passwordSchema, updateSchema, userSchema } from "../schemas/user.schema";
import { groupSchema } from "../schemas/group.schema";
import { loginSchema } from "../schemas/login.schema";
import userGroupController from "../controller/userGroup.controller";

const routes = (app: Express) => {
    app.post("/api/v1/login", validateSchema(loginSchema), userController.login);
    app.post("/api/v1/register", validateSchema(userSchema), userController.createUser);

    app.get("/api/v1/users", auth, userController.findAllUsers);
    app.get("/api/v1/users/:id", auth, userController.findUserById);
    app.put("/api/v1/users/:id", auth, validateSchema(updateSchema), userController.updateUser);
    app.put("/api/v1/users/:id/password", auth, validateSchema(passwordSchema), userController.updatePassword);
    app.delete("/api/v1/users/:id", auth, admin, userGroupController.deleteUser);
    app.post("/api/v1/groups", auth, validateSchema(groupSchema), groupController.createGroup);
    app.get("/api/v1/groups", auth, groupController.listAllGroupsInfo);
    app.put("/api/v1/groups/:id", auth, admin, validateSchema(groupSchema), groupController.updateGroup);
    app.delete("/api/v1/groups/:id", auth, admin, userGroupController.deleteGroup);
    app.post("/api/v1/users/:id/groups/:groupId", auth, userGroupController.addUserToGroup);
    app.delete("/api/v1/users/:id/groups/:groupId", auth, userGroupController.removeUserFromGroup);
    app.get("/api/v1/groups/:name/users", auth, groupController.listUsersByGroup);
    app.get("/api/v1/users/:id/groups", auth, userController.listGroupsByUser);
}

export default routes;