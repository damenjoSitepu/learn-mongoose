import mongoose from "mongoose";

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
    sameFunctionality: mongoose.SchemaTypes.ObjectId,
    types: [String],
    additional: additionalSchema
});

export default mongoose.model("Tool", toolSchema);