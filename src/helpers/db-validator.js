import Admin from "../user_admin/admin.model.js";
import Empresa from "../empresas/empresas.model.js";

export const adminExists = async (uid = "") => {
    const existe = await Admin.findById(uid);
    if (!existe) {
        throw new Error("No existe el administrador con el ID proporcionado");
    }
};

export const empresaExists = async (id = "") => {
    const existe = await Empresa.findById(id);
    if (!existe) {
        throw new Error("No existe la empresa con el ID proporcionado");
    }
};

export const emailExists = async (email = "") => {
    const existe = await Admin.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}