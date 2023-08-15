import mongoose from "mongoose";

const toolSchema = new mongoose.Schema({
    name: String,
    durability: Number,
    isActive: Boolean
});

export default mongoose.model("Tool", toolSchema);