import { supabase } from './supabase'

/**
 * Egress-Optimized fetching options.
 * Enforces pagination and field selection to minimize data transfer.
 */
export interface FetchOptions {
  page?: number
  pageSize?: number
  columns?: string // e.g. "id, full_name, created_at"
  filters?: Record<string, any>
}

/**
 * Shared API utility designed to prevent 'get all' queries.
 * Standardizes pagination and field selection across the app.
 */
export async function fetchPaginatedData<T>(
  tableName: string,
  options: FetchOptions = {}
) {
  const {
    page = 1,
    pageSize = 20, // Default limit to prevent accidental egress spikes
    columns = '*',
    filters = {}
  } = options

  // Calculate range for pagination
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from(tableName)
    .select(columns, { count: 'exact' }) // Field selection enforced
    .range(from, to) // Server-side pagination enforced
    .order('created_at', { ascending: false })

  // Apply basic filters
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query = query.eq(key, value)
    }
  })

  const { data, error, count } = await query

  if (error) {
    console.error(`API Error [${tableName}]:`, error)
    throw new Error(error.message)
  }

  return {
    data: data as T[],
    count: count || 0,
    page,
    pageSize,
    totalPages: Math.ceil((count || 0) / pageSize)
  }
}
