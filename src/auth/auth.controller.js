import { hash, verify } from "argon2"
import User from "../user_admin/admin.model.js"
import { generateJWT } from "../helpers/generate-jwt.js";

export const login = async (req, res) => {
    const { email, username, password } = req.body
    try {
        const user = await User.findOne({
            $or: [{ email: email }, { username: username }]
        })

        if (!user) {
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "No existe el usuario o correo ingresado"
            })
        }

        const validPassword = await verify(user.password, password)

        if (!validPassword) {
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "Contraseña incorrecta"
            })
        }

        const token = await generateJWT(user.id)

        return res.status(200).json({
            message: "Login successful",
            userDetails: {
                token: token,
                profilePicture: user.profilePicture
            }
        })
    } catch (err) {
        return res.status(500).json({
            message: "login failed, server error",
            error: err.message
        })
    }
}