import { useState, useEffect } from "react";
import { PriceUnit } from "../models/DbEntities";
import { apiService } from "../services/apiServiceFactory";

// Custom Hook
const useFetchPriceUnits = () => {
  const [data, setData] = useState<PriceUnit[] | null>();
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUnits = async () => {
      setIsLoading(true);
      try {
        const result = await apiService.fetchPriceUnits();
        setData(result);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUnits();
  }, []);

  return { data, error, isLoading };
};

export default useFetchPriceUnits;
