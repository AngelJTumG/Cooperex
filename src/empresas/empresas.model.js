import { Schema, model } from 'mongoose';

const empresaSchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    impactLevel:{
        type: String,
        required: [true, "Impact Level is required"],
        enum: ["LOW", "MEDIUM", "HIGH"]
    },
    category:{
        type: String,
        required: [true, "Category is required"],
        enum: ["TECHNOLOGY", "FINANCE", "HEALTH", "EDUCATION", "OTHER"]
    },
    startDate:{
        type: Date,
        required: [true, "Start Date is required"]
    },
    description:{
        type: String,
        required: [true, "Description is required"]
    },
    owner:{
        type: String,
        required: [true, "Owner is required"]
    }
},
{
    versionKey: false,
    timestamps: true
})

empresaSchema.methods.toJSON = function(){
    const { _id, ...empresa} = this.toObject()
    empresa.uid = _id
    empresa.trayectoria = this.calculateTrayectoria()
    return empresa
}

empresaSchema.methods.calculateTrayectoria = function(){
    const currentYear = new Date().getFullYear()
    const startYear = this.startDate.getFullYear()
    return currentYear - startYear
}

export default model("Empresa", empresaSchema)