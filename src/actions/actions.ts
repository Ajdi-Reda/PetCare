"use server";

import prisma from "@/services/db";
import { revalidatePath } from "next/cache";
import { petFromSchema, petIdSchema } from "@/lib/validations";

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
  const validatedPet = petFromSchema.safeParse(newPet);
  const validatedPetId = petIdSchema.safeParse(id);
  if (!validatedPet.success || !validatedPetId.success) {
    return {
      message: "Error adding pet",
    };
  }

  try {
    await prisma.pet.update({
      where: { id: validatedPetId.data },
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: "Error editing pet",
    };
  }

  revalidatePath("/app", "layout");
}

export async function deletePet(id: unknown) {
  const validatedPetId = petIdSchema.safeParse(id);
  if (!validatedPetId.success) {
    return {
      message: "Error adding pet",
    };
  }

  try {
    await prisma.pet.delete({
      where: { id: validatedPetId.data },
    });
  } catch (error) {
    return {
      message: "Error deleting pet",
    };
  }

  revalidatePath("/app", "layout");
}
