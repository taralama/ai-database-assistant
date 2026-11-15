import "reflect-metadata";
import "dotenv/config";

import express from "express";
import { AppDataSource } from "./AppDataSource";
import { User } from "./entities/User";
import {router} from './routes/chat.route'

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

 app.use('/chat',router)

app.get("/", async(_req, res) => {


    const userRepo =  AppDataSource.getRepository(User)

    // const data = await userRepo.find()

    let user : User = new User()

    user.name = 'karuna'
    user.email='karuna@gmail.com'
    user.phone = '9741847787'

    userRepo.save(user)

    

    res.json({
        message: "AI Database Assistant API",
    });
});

app.get("/api/health", (_req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Backend is running successfully",
    });
});



AppDataSource.initialize().then(()=> {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });

}).catch((error: unknown) => {
    console.error("Failed to start server:", error);
    process.exitCode = 1;
});