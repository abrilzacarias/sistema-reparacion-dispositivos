import { fetchPaginated } from "@/services/fetchPaginated"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"

export const usePaginatedQuery = ({
  key,
  endpoint,
  pageSize = 10,
  staleTime = 3000,
  enablePagination = true,
}) => {
  const API_URL = import.meta.env.VITE_API_URL;
  
  const simpleQuery = useQuery({
    queryKey: [key, 'simple'], 
    queryFn: async () => {
      const response = await fetch(`${API_URL}/${endpoint}`);
      if (!response.ok) {
        throw new Error(`Error fetching ${endpoint}`);
      }
      return response.json();
    },
    refetchOnWindowFocus: false,
    staleTime,
    enabled: !enablePagination,
  });

  const paginatedQuery = useInfiniteQuery({
    queryKey: [key, 'paginated'],
    queryFn: ({ pageParam = 1 }) =>
      fetchPaginated({ endpoint, pageParam, pageSize }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnWindowFocus: false,
    staleTime,
    enabled: enablePagination,
  });

  if (!enablePagination) {
    let processedData = [];
    if (simpleQuery.data) {
      if (Array.isArray(simpleQuery.data)) {
        processedData = simpleQuery.data;
      }
      else if (simpleQuery.data.data && Array.isArray(simpleQuery.data.data)) {
        processedData = simpleQuery.data.data;
      }
      else if (simpleQuery.data.results && Array.isArray(simpleQuery.data.results)) {
        processedData = simpleQuery.data.results;
      }
      else if (simpleQuery.data.items && Array.isArray(simpleQuery.data.items)) {
        processedData = simpleQuery.data.items;
      }
    }

    return {
      refetch: simpleQuery.refetch,
      fetchNextPage: () => {}, 
      isLoading: simpleQuery.isLoading,
      isError: simpleQuery.isError,
      isFetching: simpleQuery.isFetching,
      data: processedData,
      hasNextPage: false,
      total: processedData.length,
    };
  }

  const paginatedData = paginatedQuery.data?.pages 
    ? paginatedQuery.data.pages.flatMap((page) => page?.items ?? [])
    : [];

  return {
    refetch: paginatedQuery.refetch,
    fetchNextPage: paginatedQuery.fetchNextPage,
    isLoading: paginatedQuery.isLoading,
    isError: paginatedQuery.isError,
    isFetching: paginatedQuery.isFetching,
    isRefetching: paginatedQuery.isRefetching,
    data: paginatedData,
    hasNextPage: paginatedQuery.hasNextPage,
    total: paginatedQuery.data?.pages?.[0]?.total ?? 0,
  };
};