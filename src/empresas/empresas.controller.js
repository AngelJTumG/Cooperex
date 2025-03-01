import Empresa from './empresas.model.js';
import ExcelJS from 'exceljs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    if (!req.usuario || req.usuario.role !== 'ADMIN_ROLE') {
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
        const sortOrder = order.toLowerCase() === 'desc' ? -1 : 1; 

        const empresas = await Empresa.find().collation({ locale: 'en', strength: 2 }).sort({ name: sortOrder });

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

export const generateExcelReport = async (req, res) => {
    try {
        const empresas = await Empresa.find().collation({ locale: 'en', strength: 2 }).sort({ name: 1 });

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Empresas');

        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Nombre', key: 'name', width: 30 },
            { header: 'Nivel de Impacto', key: 'impactLevel', width: 15 },
            { header: 'Categoría', key: 'category', width: 15 },
            { header: 'Fecha de Inicio', key: 'startDate', width: 15 },
            { header: 'Descripción', key: 'description', width: 30 },
            { header: 'Propietario', key: 'owner', width: 20 },
            { header: 'Trayectoria', key: 'trayectoria', width: 15 },
        ];

        empresas.forEach(empresa => {
            worksheet.addRow({
                id: empresa._id,
                name: empresa.name,
                impactLevel: empresa.impactLevel,
                category: empresa.category,
                startDate: empresa.startDate.toISOString().split('T')[0], 
                description: empresa.description,
                owner: empresa.owner,
                trayectoria: empresa.calculateTrayectoria()
            });
        });

        const filePath = path.join(__dirname, '../../public/empresas_report.xlsx');
        await workbook.xlsx.writeFile(filePath);

        res.status(200).json({
            success: true,
            message: 'Reporte generado exitosamente',
            filePath
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al generar el reporte',
            error: error.message
        });
    }
};