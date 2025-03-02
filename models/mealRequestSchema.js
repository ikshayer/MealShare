import mongoose from "mongoose";

const mealRequestSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    grain: [{
        type: String,
        
    }],
    grainAmount: {
        type: Number,
        default: 0
    },
    fruits: [{
        type: String,
        
    }],
    fruitsAmount: { 
        type: Number,
        default: 0
    },
    vegetables: [{
        type: String,
    }],
    vegetablesAmount: { 
        type: Number,
        default: 0
    },
    protein: [{
        type: String,
    }],
    proteinAmount: { 
        type: Number,
        default: 0
    },
    dairy: [{
        type: String,
    }],
    dairyAmount: { 
        type: Number,
        default: 0
    },
    
})

const mealRequest = mongoose.models.mealRequest || mongoose.model("mealRequest", mealRequestSchema)

export default mealRequest