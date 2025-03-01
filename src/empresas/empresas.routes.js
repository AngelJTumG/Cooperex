import { Router } from 'express';
import { saveEmpresa, updateEmpresaById, getEmpresas, generateExcelReport } from './empresas.controller.js';
import { createEmpresaValidator } from '../middleware/empresa-validator.js';
import { isAdmin } from '../middleware/validate-roles.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Empresa:
 *       type: object
 *       required:
 *         - name
 *         - address
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the empresa
 *         name:
 *           type: string
 *           description: The name of the empresa
 *         address:
 *           type: string
 *           description: The address of the empresa
 *       example:
 *         id: d5fE_asz
 *         name: Empresa 1
 *         address: Calle Falsa 123
 */

/**
 * @swagger
 * tags:
 *   name: Empresas
 *   description: The empresas managing API
 */

/**
 * @swagger
 * /empresas:
 *   post:
 *     summary: Create a new empresa
 *     tags: [Empresas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empresa'
 *     responses:
 *       200:
 *         description: The empresa was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empresa'
 *       500:
 *         description: Some server error
 */
router.post('/empresas', createEmpresaValidator, saveEmpresa);

/**
 * @swagger
 * /empresas/{id}:
 *   put:
 *     summary: Update an empresa by the id
 *     tags: [Empresas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The empresa id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empresa'
 *     responses:
 *       200:
 *         description: The empresa was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empresa'
 *       404:
 *         description: The empresa was not found
 *       500:
 *         description: Some error happened
 */
router.put('/empresas/:id', createEmpresaValidator, isAdmin, updateEmpresaById);

/**
 * @swagger
 * /empresas:
 *   get:
 *     summary: Returns the list of all the empresas
 *     tags: [Empresas]
 *     responses:
 *       200:
 *         description: The list of the empresas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Empresa'
 */
router.get('/empresas', getEmpresas);

/**
 * @swagger
 * /empresas/report:
 *   get:
 *     summary: Generar reporte de empresas en Excel
 *     tags: [Empresas]
 *     responses:
 *       200:
 *         description: Reporte generado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 filePath:
 *                   type: string
 *       500:
 *         description: Error al generar el reporte
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.get('/report', generateExcelReport);

export default router;