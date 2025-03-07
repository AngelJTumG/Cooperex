import { body, param } from "express-validator";
import { empresaExists } from "../helpers/db-validator.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handdle-error.js";
import { validateJWT } from "./validate-jwt.js";
import { isAdmin } from "./validate-roles.js";

export const createEmpresaValidator = [
    validateJWT,
    isAdmin,
    body("name").notEmpty().withMessage("El nombre es requerido").isLength({ max: 25 }).withMessage("El nombre no puede exceder los 25 caracteres"),
    body("impactLevel").notEmpty().withMessage("El nivel de impacto es requerido").isIn(["LOW", "MEDIUM", "HIGH"]).withMessage("El nivel de impacto debe ser uno de los siguientes: LOW, MEDIUM, HIGH"),
    body("category").notEmpty().withMessage("La categoría es requerida").isIn(["TECHNOLOGY", "FINANCE", "HEALTH", "EDUCATION", "OTHER"]).withMessage("La categoría debe ser una de las siguientes: TECHNOLOGY, FINANCE, HEALTH, EDUCATION, OTHER"),
    body("startDate").notEmpty().withMessage("La fecha de inicio es requerida").isDate().withMessage("La fecha de inicio debe ser una fecha válida"),
    body("description").notEmpty().withMessage("La descripción es requerida"),
    body("owner").notEmpty().withMessage("El propietario es requerido"), 
    validarCampos,
    handleErrors
];

export const updateEmpresaValidator = [
    validateJWT,
    isAdmin,
    param("id").custom(empresaExists).withMessage("La empresa no existe"),
    body("name").optional().isLength({ max: 25 }).withMessage("El nombre no puede exceder los 25 caracteres"),
    body("impactLevel").optional().isIn(["LOW", "MEDIUM", "HIGH"]).withMessage("El nivel de impacto debe ser uno de los siguientes: LOW, MEDIUM, HIGH"),
    body("category").optional().isIn(["TECHNOLOGY", "FINANCE", "HEALTH", "EDUCATION", "OTHER"]).withMessage("La categoría debe ser una de las siguientes: TECHNOLOGY, FINANCE, HEALTH, EDUCATION, OTHER"),
    body("startDate").optional().isDate().withMessage("La fecha de inicio debe ser una fecha válida"),
    body("description").optional(),
    validarCampos,
    handleErrors
];
