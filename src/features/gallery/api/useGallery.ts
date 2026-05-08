import { useQuery } from '@tanstack/react-query'
import { fetchPaginatedData } from '../../../shared/utils/api'
import type { GalleryItem } from '../galleryData'

interface UseGalleryOptions {
  category: string
  page: number
  pageSize?: number
}

/**
 * Egress-optimized hook for fetching gallery items.
 * Implements server-side filtering and pagination.
 */
export function useGallery({ category, page, pageSize = 12 }: UseGalleryOptions) {
  return useQuery({
    queryKey: ['gallery', category, page],
    queryFn: async () => {
      const filters = category !== 'All' ? { category } : {}
      
      return fetchPaginatedData<GalleryItem>('gallery', {
        page,
        pageSize,
        columns: 'id, src, alt, aspect, category', // Optimized column selection
        filters,
      })
    },
    staleTime: 1000 * 60 * 10, // 10 minutes cache
  })
}
