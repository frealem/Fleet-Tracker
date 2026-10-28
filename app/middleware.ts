import {auth} from '@/app/auth';
import {NextResponse,NextRequest} from 'next/server'

export default auth((req: NextRequest & { auth?: any })=>{
const isLoggedIn=!!req.auth;
const {pathname}=req.nextUrl;

const isDashboardRoute=pathname.startsWith('/dashboard');

if(isDashboardRoute && !isLoggedIn){
    const loginUrl=new URL('/login',req.url);
    loginUrl.searchParams.set('callbackUrl',pathname)
    return NextResponse.redirect(loginUrl);
}

if(pathname.startsWith("/dashboard/admin")){
const userRole=req.auth?.user?.role;

if(userRole!=='MANAGER'){
    return NextResponse.redirect(new URL('/dashboard',req.url))
}}
    return NextResponse.next();
})

export const config={
    matcher:['/dashboard/:path*']
}
