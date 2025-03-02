import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

import User from "@models/userSchema.js";
import dotenv from 'dotenv'
dotenv.config()

import { connectToDB } from "@utils/database";

export const authOptions = {
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks:{
    
        async session({session}){
            const sessionUser = await User.findOne({
                email: session.user.email
            })
            session.user.id = sessionUser._id.toString();
            return session;
        
    },
        async signIn({profile}){
            try{
                await connectToDB()
                const userExists = await User.findOne({
                    email: profile.email
                })
                if(!userExists){
                    const totalUsers = await User.countDocuments({})
                    await User.create({
                        email: profile.email,
                        username: profile.name,
                    })
                }
                return true
            }
            catch(err){
                console.log(err)
                return false
            }
        }
    }
}

const handler = NextAuth(authOptions)


export {handler as GET, handler as POST}