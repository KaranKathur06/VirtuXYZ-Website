import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: 'USER' | 'AGENT' | 'ADMIN'
    } & DefaultSession['user']
  }
}
