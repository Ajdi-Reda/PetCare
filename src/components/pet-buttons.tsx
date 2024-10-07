"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import PetForm from "./pet-form";
import { useState } from "react";
import { flushSync } from "react-dom";

type PetButtonProps = {
  actionType: "add" | "edit" | "checkout";
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
};

export default function PetButton({
  actionType,
  onClick,
  disabled,
  children,
}: PetButtonProps) {
  const [openDialog, setOpenDialog] = useState(false);

  if (actionType === "checkout") {
    return (
      <Button variant="secondary" onClick={onClick} disabled={disabled}>
        {children}
      </Button>
    );
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        {actionType === "add" ? (
          <Button size="icon">
            <PlusIcon className="h-6 w-6" />
          </Button>
        ) : (
          <Button variant="secondary">{children}</Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === "add" ? "Add a new pet" : "Edit pet"}
          </DialogTitle>
        </DialogHeader>

        <PetForm
          actionType={actionType}
          onFormSubmission={() => flushSync(() => setOpenDialog(false))}
        />
      </DialogContent>
    </Dialog>
  );
}
