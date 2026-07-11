import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { createAdminClient } from '@/lib/supabase/server'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Admin Login',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const supabase = await createAdminClient() as any

        const { data: admin, error } = await supabase
          .from('admin_users')
          .select('*')
          .eq('email', credentials.email)
          .single()

        if (error || !admin) return null

        const valid = await comparePassword(credentials.password, (admin as any).password_hash)
        if (!valid) return null

        return {
          id: admin.id,
          email: admin.email,
          name: admin.name,
        }
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
}

async function comparePassword(plain: string, hash: string): Promise<boolean> {
  try {
    const bcrypt = await import('bcryptjs')
    return bcrypt.compare(plain, hash)
  } catch {
    return false
  }
}

export default NextAuth(authOptions)
