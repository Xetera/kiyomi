import { useAddToQueueMutation } from "@/__generated__/graphql";
import { Button, useToast } from "@chakra-ui/react";
import image from "next/image";
import React from "react";
import { RiScan2Line } from "react-icons/ri";

type QueueButtonProps = {
  slug: string;
  scanDate: Date;
};

export default function QueueButton({ scanDate, slug }: QueueButtonProps) {
  const { mutateAsync } = useAddToQueueMutation();
  const toast = useToast();
  async function addToQueue() {
    try {
      const result = await mutateAsync({ slug });
      toast({
        status: "success",
        title: "Image queued",
        position: "bottom-right",
        description: `There are currently ${result.scanFaces.queueSize} images in queue ahead of this image.`,
      });
    } catch (err) {
      toast({
        status: "error",
        position: "bottom-right",
        title: "Something went wrong",
        description: err.message,
      });
    }
  }
  return (
    <Button
      size="sm"
      leftIcon={<RiScan2Line />}
      width="100%"
      onClick={addToQueue}
    >
      Request A {scanDate ? "Rescan" : "Scan"}
    </Button>
  );
}
