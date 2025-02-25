import Empresa from './empresas.model.js';

export const addEmpresa = async (req, res) => {
    try {
        const { name, impactLevel, category, startDate, description, owner } = req.body;

        const newEmpresa = new Empresa({
            name,
            impactLevel,
            category,
            startDate,
            description,
            owner
        });

        await newEmpresa.save();

        return res.status(201).json({
            success: true,
            message: "Empresa creada exitosamente",
            empresa: newEmpresa
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al crear la empresa",
            error: err.message
        });
    }
};