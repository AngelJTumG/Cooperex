import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Cooperex API",
            version: "1.0.0",
            description: "API para el sistema de gestión de Cooperex",
            contact: {
                name: "angel",
                email: "atum-2023017@kinal.edu.gt"
            }
        },
        servers: [
            {
                url: "http://127.0.0.1:3001/cooperex/v1"
            }
        ]
    },
    apis: [
        "./src/auth/auth.routes.js",
        "./src/empresas/empresas.routes.js"
    ]
};

const swaggerDocs = swaggerJSDoc(options);

export { swaggerDocs, swaggerUi };