"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

type PetButtonProps = {
  actionType: "add" | "edit" | "checkout";

  children?: React.ReactNode;
};

export default function PetButton({
  actionType,

  children,
}: PetButtonProps) {
  if (actionType === "checkout") {
    return <Button variant="secondary">{children}</Button>;
  }

  if (actionType === "edit") {
    return <Button variant="secondary">{children}</Button>;
  }

  if (actionType === "add") {
    return (
      <Button size="icon">
        <PlusIcon className="h-6 w-6" />
      </Button>
    );
  }
}
