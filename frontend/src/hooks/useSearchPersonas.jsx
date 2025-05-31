import { fetchPersonas } from "@/services/fetchUsers"
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query"

export const useSearchPersonas = ({ query }) => {
  const queryClient = useQueryClient()
  const {
    isError,
    isLoading,
    data,
    refetch,
    fetchNextPage,
    isRefetching,
    isFetching,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["Personas", query],
    queryFn: ({ pageParam = 1 }) => fetchPersonas({ pageParam, query }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 20,
    enabled: false,
    // cacheTime: 1000 * 60 * 5 // Mantiene datos en cach por 5 minutos
  })

  return {
    refetch,
    fetchNextPage,
    isLoading,
    isRefetching,
    isError,
    isFetching,
    personas: data?.pages.flatMap((page) => page?.items) ?? [],
    hasNextPage,
    totalPersonas: data?.pages[0]?.totalPersonas,
    resetQuery: () => queryClient.invalidateQueries(["Personas"]),
  }
}
