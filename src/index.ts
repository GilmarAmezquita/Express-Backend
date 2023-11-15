import express, { Express } from "express";
import dotenv from "dotenv";
import { db } from "./config/connect";

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port: number = parseInt(process.env.PORT || "3000");
;
//routes(app)

db.then(() => {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
});