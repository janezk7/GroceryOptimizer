import { useState } from "react"

// A stupid minimal hook to hold some state about the snackbar. Almost useless. 
const useToast = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const show = () => {
    setIsOpen(true);
  }

  const hide = () => {
    setIsOpen(false);
  }

  return {isOpen, show, hide};
}

export default useToast;