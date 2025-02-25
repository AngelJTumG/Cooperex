import express from 'express';
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import apiLimiter from "../src/middleware/rate-limit-validator.js"
//import router from "../src/auth/auth.routes.js"
import { dbConnection } from './mongo.js';
import createAdmin from "./admin.js";
//import { swaggerDocs, swaggerUi } from "./swagger.js"


const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(helmet());
    app.use(morgan("dev"))
    app.use(apiLimiter)
}


const routes = (app) =>{
    //app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}


const conectarDB = async () => {
    try {
        await dbConnection();
        await createAdmin();
    } catch (err) {
        console.log(`Database connection failed: ${err}`);
        process.exit(1);
    }
};

export const initServer = () => {
    const app = express();
    try {
        middlewares(app);
        conectarDB();
        routes(app);
        const port = process.env.PORT || 3001; 
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (err) {
        console.log(`Server init failed: ${err}`);
    }
};