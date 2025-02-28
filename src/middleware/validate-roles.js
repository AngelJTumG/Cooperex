export const isAdmin = (req, res, next) => {
    if (!req || !res) {
        throw new Error("Request or Response object is missing");
    }

    if (!req.usuario) {
        return res.status(500).json({
            success: false,
            message: "Se quiere verificar un role antes de validar el token"
        });
    }

    if (req.usuario.role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            success: false,
            message: "El servicio requiere el rol de admin"
        });
    }
    next();
};