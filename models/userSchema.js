import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: [true, "Email has to be unique"],
        required: [true, 'Email is required']
    },
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    numOfStudents: {
        type: String,
        default: 0
    },
    location: [{
        type: Number,
        default: []
    }],
    requestsList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mealRequest',
        default: []
    }]

})

const User = mongoose.models.User || mongoose.model("User", profileSchema)

export default User