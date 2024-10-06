import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

type PetFormBtnProps = {
  actionType: "add" | "edit";
};

const PetFormBtn = ({ actionType }: PetFormBtnProps) => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className="self-end mt-5">
      {actionType === "add" ? "Add new pet" : "edit"}
    </Button>
  );
};

export default PetFormBtn;
