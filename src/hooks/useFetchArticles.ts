import { useQuery } from "@tanstack/react-query";
import { apiService } from "../services/apiServiceFactory";

const useFetchArticles = () => {
  const queryResult = useQuery({
    queryKey: ["articles"],
    queryFn: async () => await apiService.fetchArticles(),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
  return queryResult;
};

// Custom way
// const useFetchArticles2 = () => {
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [articles, setArticles] = useState<Article[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     console.log("Getting articles...");
//     const getArticles = async () => {
//       try {
//         setIsLoading(true);
//         const data = await apiService.fetchArticles();
//         setArticles(data);
//         setIsLoading(false);
//         console.log("Got data!", data);
//       } catch (err: unknown) {
//         if (err instanceof Error) {
//           setIsLoading(false);
//           setError(err.message); // Set error message
//         } else {
//           setError("An unexpected error occurred"); // Fallback for unknown errors
//         }
//       }
//     };

//     getArticles();
//   }, []);

//   return {isLoading, articles, error};
// };

export default useFetchArticles;
