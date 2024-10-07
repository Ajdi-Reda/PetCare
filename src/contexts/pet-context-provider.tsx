"use client";

import { addPet, deletePet, editPet } from "@/actions/actions";
import { Pet } from "@/lib/types";
import React, { createContext, useOptimistic, useState } from "react";
import { toast } from "sonner";

type PetContextProps = {
  data: Pet[];
  children: React.ReactNode;
};

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleCheckoutPet: (id: string) => Promise<void>;
  handleSelectPetId: (id: string) => void;
  handleAddPet: (newPet: Omit<Pet, "id">) => Promise<void>;
  handleEditPet: (id: string, pet: Omit<Pet, "id">) => Promise<void>;
};

export const PetContext = createContext<TPetContext | null>(null);
const PetContextProvider = ({ data, children }: PetContextProps) => {
  // const [pets, setPets] = useState(data);
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, newPet) => {
      return [
        ...state,
        {
          id: Math.random().toString(),
          ...newPet,
        },
      ];
    }
  );
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  const handleCheckoutPet = async (id: string) => {
    await deletePet(id);
    setSelectedPetId(null);
  };

  const handleSelectPetId = (id: string) => {
    setSelectedPetId(id);
  };

  const handleAddPet = async (pet: Omit<Pet, "id">) => {
    setOptimisticPets(pet);
    const error = await addPet(pet);
    if (error) {
      toast.error(error.message);
      return;
    }
  };

  const handleEditPet = async (id: string, pet: Omit<Pet, "id">) => {
    const error = await editPet(id, pet);
    if (error) {
      toast.error(error.message);
      return;
    }
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
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
