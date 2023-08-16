import mongoose from "mongoose";
import ToolSchema, { Tool } from "./schemas/Tool.schema";

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

async function updateTool(): Promise<void> {
    const tool = await ToolSchema.findById("64db81f3c873c8d7bc9dd801");
    if (tool !== null) {
        tool.sameFunctionality = new mongoose.Types.ObjectId("64db8b3414884527d63b15cf");
        await tool?.save();
    }
}

// Create Data with advanced mode 
async function createToolV2(): Promise<void> {
    try {
        const tool = await ToolSchema.create({
            name: "Beb Computer",
            durability: 50,
            isActive: true,
            types: ["C-004", "B-005"],
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

// Find Data
async function findTool(): Promise<Tool | null> {
    return await ToolSchema.findById("64db81f3c873c8d7bc9dd801");
}

async function findToolSelect(): Promise<any> {
    const tool = await ToolSchema.findOne({ name: "Computer" }).select(["name"]);
    console.log(tool?.name);
}

async function findToolWithRelation(): Promise<any> {
    const tool = await ToolSchema.findOne({ name: "Computer" }).populate("sameFunctionality");
    console.log(tool);
}

async function findCustomTool(): Promise<void> {
    // const tool = await ToolSchema.findById("64db81f3c873c8d7bc9dd801");
    const tools = await ToolSchema.findByName("beb CompuTer");
    const tool = await ToolSchema.find().byName("beb computer");
    console.log(tool);
}

// findToolWithRelation();
findCustomTool();

// findToolSelect();

// createToolWithArgument("Not Default!");
// createToolV2();
// const tool = await findTool();
// console.log(tool);
// findTool().then((data) => {
//     console.log(data);
// });

// (async () => {
//     const tool = await findTool();
//     console.log(tool?.additional?.weight);
// })();
