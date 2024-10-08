"use server";

import prisma from "@/services/db";
import { PetEssentials } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { sleep } from "@/lib/utils";
import { Pet } from "@prisma/client";
import { petFromSchema } from "@/lib/validations";

export async function addPet(newPet: unknown) {
  const validatedPet = petFromSchema.safeParse(newPet);
  if (!validatedPet.success) {
    return {
      message: "Error adding pet",
    };
  }
  try {
    await prisma.pet.create({
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: "Error adding pet",
    };
  }

  revalidatePath("/app", "layout");
}

export async function editPet(id: unknown, newPet: unknown) {
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

export async function deletePet(id: unknown) {
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
