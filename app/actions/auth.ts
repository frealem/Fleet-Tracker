'use server';

import { connectToDatabase } from "@/lib/db";
import { User } from "@/app/models/user";
import mongoose from "mongoose";

export async function registerUser(formData: FormData) {
    const full_name = formData.get('full_name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    const role = "CUSTOMER";

    if (!full_name || !email || !password) {
        return { success: false, error: 'Please fill in all fields' };
    }

    try {
        await connectToDatabase();
        const existinguser = await User.findOne({ email: email });

        if (existinguser) {
            return { success: false, error: 'User Already Exists' }; 
        }

        const tenantId = new mongoose.Types.ObjectId();
        const newUser = await User.create({ full_name, email, password, role, tenantId });

        return { success: true, user: JSON.parse(JSON.stringify(newUser)) };
    } catch (error: any) {
        return { success: false, error: error.message || 'An error occurred during registration' };
    }
}