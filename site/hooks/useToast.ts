import { useToast as useChakraToast, UseToastOptions } from "@chakra-ui/react";

const defaults: UseToastOptions = {
  position: "bottom-right",
  variant: "solid",
};

export default function useToast(status: UseToastOptions["status"]) {
  return useChakraToast({ ...defaults, status });
}
