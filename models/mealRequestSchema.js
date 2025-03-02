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
    fruits: [{
        type: String,
    }],
    vegetables: [{
        type: String,
    }],
    protein: [{
        type: String,
    }],
    dairy: [{
        type: String,
    }],
    
})

const mealRequest = mongoose.models.mealRequest || mongoose.model("mealRequest", mealRequestSchema)

export default mealRequest