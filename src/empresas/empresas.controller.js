import Empresa from './empresas.model.js';

export const saveEmpresa = async (req, res) => {
    try {
        const data = req.body;
        const user = req.usuario;

        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'Propietario no encontrado' 
            });
        }

        const empresa = new Empresa({
            ...data,
            owner: user._id,
        });

        await empresa.save();

        res.status(200).json({
            success: true,
            empresa
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al guardar la empresa',
            error
        });
    }
};