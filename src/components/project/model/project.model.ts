import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    logo: {
        type: String
    },
    description: {
        type: String,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }],
    owners: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    projectType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "projectType",
    },
    endDate: Date,
    detail: String
}, { 
    timestamps: true
})

projectSchema.virtual("countMembers", {
    ref: "user",
    localField: "members",
    foreignField: "_id",
    count: true
})

export default mongoose.model("project", projectSchema)