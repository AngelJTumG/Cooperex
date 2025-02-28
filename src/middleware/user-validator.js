import { body } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handdle-error.js";

export const loginValidator = [
    body("email").isEmail().withMessage("El correo debe ser válido"),
    body("username").notEmpty().withMessage("El nombre de usuario es requerido"),
    body("password").notEmpty().withMessage("La contraseña es requerida"),
    validarCampos,
    handleErrors
];