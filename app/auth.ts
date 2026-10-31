import { connectToDatabase } from "@/lib/db";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { User } from "@/app/models/user";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are not provided!");
                }
                
                await connectToDatabase();

                // Find user and explicitly select password (if select: false is set in schema)
                const user = await User.findOne({ email: credentials.email }).select("+password");
                if (!user) {
                    throw new Error("User not found in the database!");
                }

                // Compare submitted password with hashed password in database
                const passwordValidity = await bcrypt.compare(
                    credentials.password as string, 
                    user.password
                );

                if (!passwordValidity) {
                    throw new Error("Invalid password or email!");
                }

                // Return user object that gets stored in the JWT token
                return {
                    id: user._id.toString(),
                    full_name: user.full_name,
                    role: user.role,
                    tenantId: user.tenantId.toString(),
                    email: user.email,
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.tenantId = user.tenantId;
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as string;
                session.user.tenantId = token.tenantId as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login"
    },
    session: {
        strategy: 'jwt'
    }
});