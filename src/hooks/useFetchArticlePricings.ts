import { useQuery } from "@tanstack/react-query";
import { apiService } from "../services/apiServiceFactory";

const useFetchArticlePricings = (articleId:number) => {
  const queryResult = useQuery({
    queryKey: ["articlePricings", articleId],
    queryFn: async () => await apiService.fetchArticlePricings(articleId),
    staleTime: 60 * 1000,
    retry: 2,
  });
  return queryResult;
};

export default useFetchArticlePricings;