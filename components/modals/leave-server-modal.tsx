"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModalStore } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const LeaveServerModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModalStore();
  const [isLoading, setIsLoading] = useState(false);
  const isModalOpen = isOpen && type === "leaveServer";
  const router = useRouter();
  const { server } = data;
  const handleClose = () => {
    onClose();
  };
  const onClick = async ()=>{
    try{
      setIsLoading(true);
      await axios.patch(`/api/servers/${server?.id}/leave`);
      onClose();
      router.refresh();
    }catch(error){
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white transition ease-in-out duration-700 text-black p-0 rounded-md overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Leave Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to leave{" "}
            <span className="font-semibold text-indigo-500">
              {server?.name}
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={onClick} variant="primary">
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
