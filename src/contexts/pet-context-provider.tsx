"use client";

import { addPet, deletePet, editPet } from "@/actions/actions";
import { PetEssentials } from "@/lib/types";
import { Pet } from "@prisma/client";
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
  handleCheckoutPet: (id: Pet["id"]) => Promise<void>;
  handleSelectPetId: (id: Pet["id"]) => void;
  handleAddPet: (newPet: PetEssentials) => Promise<void>;
  handleEditPet: (id: Pet["id"], pet: PetEssentials) => Promise<void>;
};

export const PetContext = createContext<TPetContext | null>(null);
const PetContextProvider = ({ data, children }: PetContextProps) => {
  // const [pets, setPets] = useState(data);
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, { action, payload }) => {
      switch (action) {
        case "add":
          return [...state, { ...payload, id: Math.random().toString() }];
        case "edit":
          return state.map((pet) => {
            if (pet.id === payload.id) {
              return {
                ...pet,
                ...payload.pet,
              };
            }
            return pet;
          });
        case "checkout":
          return state.filter((pet) => pet.id !== payload);
        default:
          return state;
      }
    }
  );
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  const handleSelectPetId = (id: Pet["id"]) => {
    setSelectedPetId(id);
  };

  const handleAddPet = async (pet: PetEssentials) => {
    setOptimisticPets({ action: "add", payload: pet });
    const error = await addPet(pet);
    if (error) {
      toast.error(error.message);
      return;
    }
  };

  const handleEditPet = async (id: Pet["id"], pet: PetEssentials) => {
    setOptimisticPets({ action: "edit", payload: { id, pet } });
    const error = await editPet(id, pet);
    if (error) {
      toast.error(error.message);
      return;
    }
  };
  const handleCheckoutPet = async (id: Pet["id"]) => {
    setOptimisticPets({ action: "checkout", payload: id });
    await deletePet(id);
    setSelectedPetId(null);
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
