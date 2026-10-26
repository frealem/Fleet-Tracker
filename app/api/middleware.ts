import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { startsWith } from "zod";

export async function middleware(req:NextRequest){

    const token=await getToken({req,secret:process.env.NEXTAUTH_SECRET});
    const{ pathname }=req.nextUrl;
    const managerRoutes=['/dispatch','/analytics','/fleet','users']
    const driverRoutes=['/driver/dashboard']

    const isManagerRoute=managerRoutes.some((route)=>pathname.startsWith(route))
    const isDriverRoute=driverRoutes.some((route)=>pathname.startsWith(route))

    if(!token && isManagerRoute || isDriverRoute){

        const loginUrl=new URL('/login',req.url);
        loginUrl.searchParams.set('callbackUrl',pathname);
        return NextResponse.redirect(loginUrl);

    }

    if(token){
        const userRole=token.role;

        if(userRole==="CUSTOMER" && isManagerRoute || isDriverRoute){
            return NextResponse.redirect(new URL('',req.url))
        }
    }
}