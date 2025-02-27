import { Router } from 'express';
import { saveEmpresa, updateEmpresaById, getEmpresas } from './empresas.controller.js';
import { createEmpresaValidator } from '../middleware/empresa-validator.js';

const router = Router();

router.post('/empresas', createEmpresaValidator, saveEmpresa);
router.put('/empresas/:id',createEmpresaValidator, updateEmpresaById);
router.get('/empresas',getEmpresas);

export default router;