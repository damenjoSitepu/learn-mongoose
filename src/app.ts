import mongoose from "mongoose";
import ToolSchema from "./schemas/Tool.schema";

mongoose.connect("mongodb://localhost/school");

// New keyword
async function createToolWithNewKeyword(): Promise<void> {
    const tool = new ToolSchema({
        name: "Wand",
        durability: 1000,
        isActive: true
    });
    await tool.save();

}

// Create keyword
async function createToolWithCreateKeyword(): Promise<void> {
    await ToolSchema.create({
        name: "Wand",
        durability: 1000,
        isActive: true
    });
}

// createTool();