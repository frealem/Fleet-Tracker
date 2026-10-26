import { NextAuthOptions } from "next-auth"
import CreditialProvider from "next-auth/providers/credentials"
import { User } from '@/app/models/user'
import { connectToDatabase } from "./db"
import bcrypt from 'bcryptjs'

export const AuthOption:NextAuthOptions={

        session:{
            strategy:'jwt'
        },
        providers:[
            CreditialProvider({
                name:'Creditials',

                credentials:{
                    email:{label:"Email",type:'email'},
                    password:{label:"Password",type:'password'}
                },
                async authorize(credentials) {

                    if(!credentials?.email || !credentials?.password){
                        throw new Error("Please Enter email and password!")
                    }
                    await connectToDatabase();

                    const user=await User.findOne({email:credentials.email.toLowerCase()})

                    if(!user || !user.password){
                        throw new Error("The User is not Found with this email");
                    }

                    const isPasswordMatch=await bcrypt.compare(
                        credentials.password,
                        user.password
                    )
                    if(!isPasswordMatch){
                        throw new Error('Invalid crendentials!')
                    }

                    return {
                        id:user._id.toString(),
                        email:user.email,
                        full_name:user.full_name,
                        role:user.role,
                        tenantId:user.tenantId?.toString() || ""
                    }
                },
            })
        ],

        callbacks:{
            async jwt({token,user}){
                if(user){
                    token.id=user.id;
                    token.role=(user as any).role;
                    token.tenantId=(user as any).tenantId;

                }

                return token;
            },
        
        async session({session,token}){

            if(token && session.user){
                session.user.id=token.id as string;
                session.user.role=token.role as 'MANAGER' | 'DRIVER' | 'CUSTOMER';
                session.user.tenantId=token.tenantId as string;
            }
            return session;
        },    
        },

        pages:{
            signIn:'/login',
        },

        secret:process.env.NEXTAUTH_SECRET


}