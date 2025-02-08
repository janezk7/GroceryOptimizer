import { useState } from "react";
import { Article, ShoppingStore } from "../models/DbEntities";
import { apiService } from "../services/apiServiceFactory";
import { AppConfig } from "../config";

const useUpdateArticlePricing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showFailure, setShowFailure] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  // TODO: Refactor
  const [isFieldsDisabled, setIsFieldsDisabled] = useState<boolean>(true);

  const updateArticlePricing = async (
    isNew: boolean,
    article: Article | undefined,
    newPrice: number | "",
    selectedShop: ShoppingStore | undefined
  ) => {
    console.log("OnUpdatePricing");

    // Frontend validation
    if (!newPrice) {
      setShowFailure(true);
      setFeedbackMessage("Enter price!");

      // setTimeout(() => {
      //   setShowFailure(false);
      // }, AppConfig.ALERT_TIMEOUT_MS)
      return;
    }

    if (!article) {
      setFeedbackMessage("Error: No article info.");
      return;
    }

    if (!selectedShop) {
      setFeedbackMessage("No shop selected");
      return;
    }

    // Set states
    setIsLoading(true);
    setIsFieldsDisabled(true);
    setShowFailure(false);
    setShowSuccess(false);

    // Server-side update
    const response = await apiService.addArticleShopPricing(
      article.id,
      selectedShop.id,
      newPrice
    );
    console.log(response);
    if (response.ok) {
      setShowSuccess(true);
    } else {
      setShowFailure(true);
      setFeedbackMessage(response.originalError.message);
    }

    setTimeout(() => {
      setShowSuccess(false);
      setShowFailure(false);
    }, AppConfig.ALERT_TIMEOUT_MS);

    setIsLoading(false);
    setIsFieldsDisabled(false);
  };

  return {
    updateArticlePricing,
    isLoading,
    showSuccess,
    showFailure,
    feedbackMessage,
    // TODO: Refactor
    isFieldsDisabled,
    setIsFieldsDisabled,
  };
};

export default useUpdateArticlePricing;
