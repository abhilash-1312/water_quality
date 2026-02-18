import prisma from '@repo/db/client'
import { signinInput } from '@/zod/validateUser'
import bcrypt from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWTPayload, SignJWT, importJWK } from 'jose';


const generateJWT = async (payload: JWTPayload) => {
    const secret = process.env.JWT_SECRET ?? 'secret';
  
    const jwk = await importJWK({ k: secret, alg: 'HS256', kty: 'oct' });
  
    const jwt = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('365d')
      .sign(jwk);
  
    return jwt;
  };
  

export const NEXT_AUTH_CONFIG = {
    providers: [
      CredentialsProvider({
          name: "credentials",
          credentials: {},
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          async authorize(credentials: any) {
              try {
                const {email, password} = credentials;
                const signSuccess = signinInput.safeParse({email, password})
                if(!signSuccess){
                  return null;
                }
                const user = await prisma.user.findFirst({
                  where: {
                    email
                  },
                  select: {
                    userId: true,
                    username: true,
                    email: true,
                    password: true,
                    role: true
                  }
                });
                
                if(!user || !await bcrypt.compare(password, user.password)){
                  return null;
                }
                const jwt = await generateJWT({
                    id: user.userId,
                });
                await prisma.user.update({
                    where: {
                        userId: user.userId
                    },
                    data: {
                        token: jwt
                    }
                })
                return {
                  id: user.userId,
                  name: user.username,
                  email: user.email,
                  role: user.role,
                  token: jwt
                }
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              } catch (error) {
                return null;
              } 
          },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        jwt: async ({ user, token }: any) => {
        if (user) {
            token.uid = user.id;
            token.jwtToken = user.token;
            token.role = user.role
        }
        return token;
      },
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session: ({ session, token }: any) => {
          if (session.user) {
              session.user.id = token.uid;
              session.user.role = token.role;
          }
          return session
      }
    },
    pages: {
      signIn: '/login'
    }
    
  }