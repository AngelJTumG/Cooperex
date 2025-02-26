
export const validateEmpresaParams = (req, res, next) => {
    const { name, impactLevel, category, startDate, description, owner } = req.body;

    if (!name || typeof name !== 'string' || name.length > 25) {
        return res.status(400).json({
            msg: "El nombre es obligatorio y no puede exceder los 25 caracteres"
        });
    }

    const validImpactLevels = ["LOW", "MEDIUM", "HIGH"];
    if (!impactLevel || !validImpactLevels.includes(impactLevel)) {
        return res.status(400).json({
            msg: "El nivel de impacto es obligatorio y debe ser uno de los siguientes: LOW, MEDIUM, HIGH"
        });
    }

    const validCategories = ["TECHNOLOGY", "FINANCE", "HEALTH", "EDUCATION", "OTHER"];
    if (!category || !validCategories.includes(category)) {
        return res.status(400).json({
            msg: "La categoría es obligatoria y debe ser una de las siguientes: TECHNOLOGY, FINANCE, HEALTH, EDUCATION, OTHER"
        });
    }
    next();
};