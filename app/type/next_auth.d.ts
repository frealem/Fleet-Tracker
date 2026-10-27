import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth"{
    interface User{
        role: string;
    tenantId: string;
    full_name: string;
    }
   interface Session {
    user: {
      role: string;
      tenantId: string;
      full_name: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
    interface JWT {
      role: string;
      tenantId: string;}}