import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../services/apiServiceFactory";

const useCreateArticle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();

  const createArticle = async (
    name: string,
    selectedUnitId: number | undefined,
    note: string
  ) => {
    // Reset states
    setShowFailure(false);
    setShowSuccess(false);
    setIsLoading(true);
    try {
      if (!selectedUnitId) throw new Error("Please select unit");

      const response = await apiService.createArticle(
        name,
        selectedUnitId,
        note
      );
      if (!response.ok) {
        throw new Error(response.data ?? response.problem);
      }

      setShowSuccess(true);
      navigate(`/articledetails/${response.data}`);
    } catch (error) {
      setShowFailure(true);
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createArticle,
    isLoading,
    showFailure,
    showSuccess,
    error
  };
};

export default useCreateArticle;