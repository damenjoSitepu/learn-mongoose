import mongoose from "mongoose";
import ToolSchema from "./schemas/Tool.schema";

mongoose.connect("mongodb://localhost/school");

/**
 * Create Tool
 */
async function createTool(): Promise<void> {
    // const tool = new ToolSchema({
    //     name: "Wand",
    //     durability: 1000,
    //     isActive: true
    // });
    // await tool.save();
    await ToolSchema.create({
        name: "Wand",
        durability: 1000,
        isActive: true
    });
}

// createTool();