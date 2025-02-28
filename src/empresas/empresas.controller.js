import Empresa from './empresas.model.js';
import { isAdmin } from '../middleware/validate-roles.js';

export const saveEmpresa = async (req, res) => {
    try {
        const data = req.body;

        const empresa = new Empresa({
            ...data,
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

export const updateEmpresaById = async (req, res) => {
    if (!isAdmin(req.usuario)) {
        return res.status(403).json({
            success: false,
            message: 'Acceso denegado'
        });
    }
    try {
        const { id } = req.params;
        const data = req.body;
        const empresa = await Empresa.findById(id);

        if (!empresa) {
            return res.status(404).json({
                success: false,
                message: 'Empresa no encontrada'
            });
        }

        const updatedEmpresa = await Empresa.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            success: true,
            empresa: updatedEmpresa
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error al actualizar la empresa",
            error: error.message
        });
    }
};

export const getEmpresas = async (req, res) => {
    try {
        const { order = 'asc' } = req.query; 
        const sortOrder = order === 'desc' ? -1 : 1; 

        const empresas = await Empresa.find().sort({ name: sortOrder });

        res.status(200).json({
            success: true,
            empresas
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener las empresas',
            error: error.message
        });
    }
};