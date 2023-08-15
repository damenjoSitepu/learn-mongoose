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

// Create data with argument
async function createToolWithArgument(toolName: string = ""): Promise<void> {
    const tool = await ToolSchema.create({
        name: "By Default",
        durability: 9999,
        isActive: true
    });
    if (toolName?.length > 0) {
        // @ts-ignore
        tool.name = toolName;
        await tool.save();
    }
}

// createToolWithArgument("Not Default!");