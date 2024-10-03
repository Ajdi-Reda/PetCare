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
  selectedPet: Pet | undefined;
  handleSelectPetId: (id: string) => void;
};

export const PetContext = createContext<TPetContext | null>(null);
const PetContextProvider = ({ data, children }: PetContextProps) => {
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const selectedPet = pets.find((pet) => pet.id === selectedPetId);

  const handleSelectPetId = (id: string) => {
    setSelectedPetId(id);
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        selectedPet,
        handleSelectPetId,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;
