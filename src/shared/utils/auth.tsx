import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from './supabase'
import type { User, Session } from '@supabase/supabase-js'
import { useQuery, useQueryClient } from '@tanstack/react-query'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * Production-ready Auth Provider.
 * Uses TanStack Query to cache the session with a TTL (staleTime) to prevent
 * redundant network calls across components.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient()
  const [activeUser, setActiveUser] = useState<User | null>(null)

  // 1. Centralized Session Query with 4-minute TTL (as requested)
  const { data: session, isLoading } = useQuery({
    queryKey: ['auth-session'],
    queryFn: async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error
      return session
    },
    staleTime: 1000 * 60 * 4, // 4-minute TTL
    gcTime: 1000 * 60 * 10,  // Keep in cache for 10 minutes
  })

  useEffect(() => {
    // Sync user state with session
    setActiveUser(session?.user ?? null)

    // 2. Listen for auth changes and invalidate cache immediately on change
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      queryClient.setQueryData(['auth-session'], session)
      setActiveUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [session, queryClient])

  const signOut = async () => {
    await supabase.auth.signOut()
    queryClient.setQueryData(['auth-session'], null)
    setActiveUser(null)
  }

  const value = {
    user: activeUser,
    session: session ?? null,
    loading: isLoading,
    signOut
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
