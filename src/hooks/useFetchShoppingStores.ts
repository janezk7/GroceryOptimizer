import { useQuery } from "@tanstack/react-query";
import { apiService } from "../services/apiServiceFactory";
import { useEffect } from "react";

// Custom Hook using React Query
const useFetchShoppingStores = () => {
  const queryResult = useQuery({
    queryKey: ["shoppingStores"], // Cache key
    queryFn: async () => {
      return await apiService.fetchShoppingStores(); // Fetch function
    },
    staleTime: Infinity,
    retry: 2, // Retry failed requests twice
  });

  const { data, error, isLoading, isFetching, isStale, failureCount, refetch } =
    queryResult;

  useEffect(() => {
    console.log("🔍 Fetching Status:");
    console.log("isLoading:", isLoading);
    console.log("isFetching:", isFetching);
    console.log("isStale:", isStale);
    console.log("Failure Count:", failureCount);

    if (error) {
      console.error("❌ Error fetching data:", error.message);
    } else if (data) {
      console.log("✅ Query Result (Cached Data):");
      console.table(data);
    }
  }, [error]);
  return queryResult;
};

export default useFetchShoppingStores;
