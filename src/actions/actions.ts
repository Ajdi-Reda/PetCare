"use server";

import prisma from "@/services/db";
import { PetEssentials } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { sleep } from "@/lib/utils";
import { Pet } from "@prisma/client";

export async function addPet(newPet: PetEssentials) {
  try {
    await prisma.pet.create({
      data: newPet,
    });
  } catch (error) {
    return {
      message: "Error adding pet",
    };
  }

  revalidatePath("/app", "layout");
}

export async function editPet(id: string, newPet: PetEssentials) {
  try {
    await prisma.pet.update({
      where: { id },
      data: newPet,
    });
  } catch (error) {
    return {
      message: "Error editing pet",
    };
  }

  revalidatePath("/app", "layout");
}

export async function deletePet(id: Pet["id"]) {
  await sleep(2000);
  try {
    await prisma.pet.delete({
      where: { id },
    });
  } catch (error) {
    return {
      message: "Error deleting pet",
    };
  }

  revalidatePath("/app", "layout");
}
