import mongoose from "mongoose";

const additionalSchema = new mongoose.Schema({
    color: String,
    height: Number,
    weight: Number
});

const toolSchema = new mongoose.Schema({
    name: String,
    durability: Number,
    isActive: Boolean,
    grade: String,
    createdAt: Date,
    updatedAt: Date,
    sameFunctionality: mongoose.SchemaTypes.ObjectId,
    types: [String],
    additional: additionalSchema
});

export default mongoose.model("Tool", toolSchema);