import mongoose, { Document, Query, Model } from "mongoose";

export interface Tool extends Document {
    id: number;
    name: string;
    durability: number;
    isActive: boolean;
    grade: string;
    createdAt: Date;
    updatedAt: Date;
    types: string[];
    additional: ToolAdditional;
    sameFunctionality: mongoose.Types.ObjectId;
} 

interface ToolAdditional extends Document {
    color: string;
    height: number;
    weight: number;
}

export interface ToolQueryHelper extends Model<Tool> {
    byName(name: string): Query<Tool[], Tool, {}>;
}

export interface ToolModel extends Model<Tool, ToolQueryHelper> {
    findByName(name: string): Query<Tool[], Tool, {}>;
}

const additionalSchema = new mongoose.Schema<ToolAdditional>({
    color: {
        type: String,
        lowercase: true
    },
    height: Number,
    weight: Number
});

const toolSchema = new mongoose.Schema<Tool, ToolModel, {}, ToolQueryHelper>({
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

toolSchema.statics.findByName = function (name: string): Query<Tool[],Tool,{}> {
    return this.find({ name: new RegExp(name, "i") });
};

toolSchema.query.byName = function (name: string): Query<Tool[], Tool, {}> {
    return this.where({ name: new RegExp(name, "i") });
}

const ToolModel: ToolModel = mongoose.model<Tool, ToolModel, ToolQueryHelper>("Tool", toolSchema);

export default ToolModel;