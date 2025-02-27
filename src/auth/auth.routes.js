import { Router } from "express";
import { login } from "./auth.controller.js";
import { loginValidator } from "../middlewares/user-validators.js";

const router = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *                 example: johndoe@example.com
 *               username:
 *                 type: string
 *                 description: User's username
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 userDetails:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: jwt_token
 *                     profilePicture:
 *                       type: string
 *                       example: profile_picture_url
 *       400:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Credenciales inválidas
 *                 error:
 *                   type: string
 *                   example: No existe el usuario o correo ingresado
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: login failed, server error
 *                 error:
 *                   type: string
 *                   example: Error message
 */

router.post(
  "/login",
  loginValidator,
  login
);

export default router;