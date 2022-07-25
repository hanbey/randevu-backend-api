import mongoose from "mongoose";

const Town = new mongoose.Schema(
    {
        code: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        city_code: {
            type: Number,
            required: true
        },
        status: {
            type: Boolean,
            required: true,
            default: false
        },
        created_at: {
            type: Date,
            default: Date.now()
        },
        updated_at: {
            type: Date,
            default: Date.now()
        },
        deleted_at: {
            type: Date
        }
    },
    {
        timestamps: false
    }
);

export default mongoose.model("Town", Town);
