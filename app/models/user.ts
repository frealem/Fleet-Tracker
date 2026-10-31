// app/models/user.ts
import mongoose, { models, model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
    full_name: string;
    email: string;
    password: string;
    role: "MANAGER" | "DRIVER" | "CUSTOMER";
    tenantId: mongoose.Types.ObjectId;
}

export const userSchema = new Schema<IUser>({
    full_name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["MANAGER", "DRIVER", "CUSTOMER"], default: "CUSTOMER" },
    tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
},
{ timestamps: true }
);

// Clean async pre-save hook without the 'next' parameter conflict
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

export const User = models.User || model<IUser>('User', userSchema);