import { fetchPaginated } from "@/services/fetchPaginated"
import { useInfiniteQuery } from "@tanstack/react-query"

export const usePaginatedQuery = ({
  key,
  endpoint,
  pageSize = 10,
  staleTime = 3000,
}) => {
  const {
    isError,
    isLoading,
    data,
    refetch,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [key],
    queryFn: ({ pageParam = 1 }) =>
      fetchPaginated({ endpoint, pageParam, pageSize }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnWindowFocus: false,
    staleTime,
  })

  return {
    refetch,
    fetchNextPage,
    isLoading,
    isError,
    isFetching,
    data: data?.pages.flatMap((page) => page?.items ?? []),
    hasNextPage,
    total: data?.pages[0]?.total ?? 0,
  }
}
