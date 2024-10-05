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
  numberOfPets: number;
  handleCheckoutPet: (id: string) => void;
  handleSelectPetId: (id: string) => void;
  handleAddPet: (newPet: Omit<Pet, "id">) => void;
  handleEditPet: (id: string, pet: Omit<Pet, "id">) => void;
};

export const PetContext = createContext<TPetContext | null>(null);
const PetContextProvider = ({ data, children }: PetContextProps) => {
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = pets.length;

  const handleCheckoutPet = (id: string) => {
    setPets((prev) => prev.filter((pet) => pet.id !== id));
    setSelectedPetId(null);
  };

  const handleSelectPetId = (id: string) => {
    setSelectedPetId(id);
  };

  const handleAddPet = (pet: Omit<Pet, "id">) => {
    setPets((prev) => [
      ...prev,
      { id: new Date().getTime().toString(), ...pet },
    ]);
  };

  const handleEditPet = (id: string, pet: Omit<Pet, "id">) => {
    setPets((prev) => prev.map((p) => (p.id === id ? { id, ...pet } : p)));
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        selectedPet,
        numberOfPets,
        handleCheckoutPet,
        handleSelectPetId,
        handleAddPet,
        handleEditPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;
