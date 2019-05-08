import mongoose from "mongoose"

const projectStatusSchema = new mongoose.Schema({
    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true
    },
    ratedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }],
}, { 
    timestamps: true
})

export default mongoose.model("projectSchema", projectStatusSchema)