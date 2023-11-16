# Express Backend With Typescript
Welcome to a basic project for user and groups management. In this project you will find functionalities like CRUD of users and groups, the management and consult of this data.

## Requirements
- [Node.js](https://nodejs.org/en)
- [Mongo](https://www.mongodb.com/en)

## First Steps
To use this project, you could use the basic configuration, that is public and has high vulnerability. But, if you want to configure your own environment: 

**1.** Create a new environment file:
    
    > .env
    
    
**2.** Add the nex three lines to it:

    PORT=<numeric>  # Add the port where you will deploy this backend project.
    MONGO_URI=<mongo connection> # Add the link to your mongo data base.
    JWT_SECRET=<secret_key> # Add the secret key to pretect your passwords.

## Roles
The backend works with two roles:

    user
    superadmin

The default role is user and it could not be modified in the creation of a user, it must be directly in the database.

## Development 
The basic configuration of the backend is carried out with the purpose of having an easy and fast deployment locally.
To start using the backend you only need to do the following: 

**1.** Install all necessary dependencies:

    npm i

The [package.json](./package.json) has all the dependencies used here.

**2.** Start the backend with all necessary dependencies:

    npm run dev

When you modify something on the server side, you just need to save and the server will be updated with the changes.

## Endpoints
The enpoints of this backend are in [routes index.ts](./src/routes/index.ts). All these endpoints has validations that are [explained here](#validations-and-middlewares). At this moment, we have the next endpoints:  

**1.** The basic register and login with jwt:

    
    app.post("/api/v1/login", validateSchema(loginSchema), userController.login);
    app.post("/api/v1/register", validateSchema(userSchema), userController.createUser);
    
**2.** The endpoints to consult user information:

    app.get("/api/v1/users", auth, userController.findAllUsers);
    app.get("/api/v1/users/:id", auth, userController.findUserById);
    app.get("/api/v1/users/:id/groups", auth, userController.listGroupsByUser);

**3.** The endpoints to update user information:

    app.put("/api/v1/users/:id", auth, validateSchema(updateSchema), userController.updateUser);
    app.put("/api/v1/users/:id/password", auth, validateSchema(passwordSchema), userController.updatePassword);

**4.** Endpoint to delete user:

    app.delete("/api/v1/users/:id", auth, admin, userGroupController.deleteUser);

**5.** Endpoint to create a group:

    app.post("/api/v1/groups", auth, validateSchema(groupSchema), groupController.createGroup);

**6.** Endpoint to consult groups information:

    app.get("/api/v1/groups", auth, groupController.listAllGroupsInfo);
    app.get("/api/v1/groups/:name/users", auth, groupController.listUsersByGroup);

**7.** Endpoint to update a group:

    app.put("/api/v1/groups/:id", auth, admin, validateSchema(groupSchema), groupController.updateGroup);

**8.** Endpoint to delete a group:

    app.delete("/api/v1/groups/:id", auth, admin, userGroupController.deleteGroup);

**9.** And finally the endpoints to manage relation between users and groups:

    app.post("/api/v1/users/:id/groups/:groupId", auth, userGroupController.addUserToGroup);
    app.delete("/api/v1/users/:id/groups/:groupId", auth, userGroupController.removeUserFromGroup);

## Validations and middlewares
To validate the information of the request, the endpoints user middlewares like:

**1.** [Auth middleware](./src/middleware/auth.middleware.ts):
  
It verify that the request has an authorization header and the given token is valid.

**2.** [Validate Admin](./src/middleware/validateAdmin.middleware.ts):

It verify the role of the logged user and give permission to the enpoint if the user role is "superadmin".

**3.** [Validate Schema](./src/middleware/validateSchema.middleware.ts):

This middleware is encharge of check the request body and validate that it have the correct params.

## Videos Of The Endpoints In Spanish

[![Video Endpoints Part 1](https://img.youtube.com/vi/nY6hIpzmm1Q/hqdefault.jpg)](https://youtu.be/nY6hIpzmm1Q)

[![Video Endpoints Part 2](https://img.youtube.com/vi/Z3608jgvbz8/hqdefault.jpg)](https://youtu.be/Z3608jgvbz8)
