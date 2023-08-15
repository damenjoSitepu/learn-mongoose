import mongoose, { Document } from "mongoose";

export interface Tool extends Document {
    id: number;
    name: string;
    durability: number;
    isActive: boolean;
    grade: string;
    createdAt: Date;
    updatedAt: Date;
    types: string[];
    additional: ToolAdditional
} 

interface ToolAdditional extends Document {
    color: string;
    height: number;
    weight: number;
}

const additionalSchema = new mongoose.Schema({
    color: {
        type: String,
        lowercase: true
    },
    height: Number,
    weight: Number
});

const toolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    durability: {
        type: Number,
        min: 0,
        max: 9999,
        validate: {
            validator: (v: number) => v === 50,
            message: "Durability value must be equals to 50!"
        }
    },
    isActive: Boolean,
    grade: String,
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    sameFunctionality: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Tool"
    },
    types: [String],
    additional: additionalSchema
});

export default mongoose.model("Tool", toolSchema);