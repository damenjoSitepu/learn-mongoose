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
        tool.name = toolName;
        await tool.save();
    }
}

// Create Data with advanced mode 
async function createToolV2(): Promise<void> {
    try {
        const tool = await ToolSchema.create({
            name: "Computer",
            durability: 10000,
            isActive: true,
            types: ["C-001", "B-001"],
            additional: {
                color: "Gold",
                weight: 100
            },
        });
        tool.createdAt = new Date();
        await tool.save();
    } catch (e: any) {
        console.log(e.message);
        // console.log(e.errors.durability)
    }
}

// createToolWithArgument("Not Default!");
// createToolV2();