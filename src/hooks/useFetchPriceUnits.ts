import { apiService } from "../services/apiServiceFactory";
import { useQuery } from "@tanstack/react-query";

const useFetchPriceUnits = () => {
  const queryResult = useQuery({
    queryKey: ["priceUnits"],
    queryFn: async () => await apiService.fetchPriceUnits(),
    staleTime: Infinity,
    retry: 2,
  });
  return queryResult;
};

// Custom Hook
// const useFetchPriceUnits = () => {
//   const [data, setData] = useState<PriceUnit[] | null>();
//   const [error, setError] = useState<Error | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const fetchUnits = async () => {
//       setIsLoading(true);
//       try {
//         const result = await apiService.fetchPriceUnits();
//         setData(result);
//       } catch (error) {
//         setError(error as Error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchUnits();
//   }, []);

//   return { data, error, isLoading };
// };

export default useFetchPriceUnits;
