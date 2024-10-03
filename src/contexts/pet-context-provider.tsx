"use client";

import { Pet } from "@/lib/types";
import React, { createContext, useState } from "react";

type PetContextProps = {
  data: Pet[];
  children: React.ReactNode;
};

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  handleSelectPetId: (id: string) => void;
};

export const PetContext = createContext<TPetContext | null>(null);
const PetContextProvider = ({ data, children }: PetContextProps) => {
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const handleSelectPetId = (id: string) => {
    setSelectedPetId(id);
  };
  console.log(selectedPetId);

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        handleSelectPetId,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;
