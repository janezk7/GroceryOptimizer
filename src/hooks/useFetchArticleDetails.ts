import { useQuery } from "@tanstack/react-query";
import { apiService } from "../services/apiServiceFactory";
import { Article } from "../models/DbEntities";
import { useLocation } from "react-router-dom";

const useFetchArticleDetails = (id: number) => {
  const location = useLocation();
  const articleFromLocation: Article | undefined = location.state; // Gets the article from navigation state

  // Use article from location if available, otherwise fetch from API
  const shouldUseArticleFromLocation = !!articleFromLocation;

  const {
    data: article,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["articleDetails", id],
    queryFn: async () => await apiService.fetchArticleDetails(id),
    staleTime: 2 * 60 * 1000,
    enabled: !shouldUseArticleFromLocation,
    retry: 2,
  });

  return {
    article: shouldUseArticleFromLocation ? articleFromLocation : article,
    isLoading,
    error,
  };
};

// Custom way
// const useFetchArticleDetails2 = (id: number) => {
//   const [article, setArticle] = useState<Article>();
//   const [isLoading, setIsLoading] = useState(false);
//   const location = useLocation();
//   // Get article data
//   useEffect(() => {
//     const articleLocationData: Article = location.state || {};
//     const useLocationDataForOptimization = false;
//     if (useLocationDataForOptimization && articleLocationData) {
//       setArticle(articleLocationData);
//     } else {
//       const fetchArticleData = async () => {
//         setIsLoading(true);
//         const result = await apiService.fetchArticleDetails(Number(id));
//         setIsLoading(false);
//         if (!result) {
//           alert("Error fetching article details");
//           return;
//         }
//         setArticle(result);
//       };
//       fetchArticleData();
//     }
//   }, []);
// };

export default useFetchArticleDetails;
