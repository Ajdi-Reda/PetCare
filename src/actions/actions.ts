"use server";

import prisma from "@/services/db";
import { Pet } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { sleep } from "@/lib/utils";

export async function addPet(formData) {
  await sleep(2000);
  try {
    await prisma.pet.create({
      data: {
        name: formData.get("name"),
        ownerName: formData.get("ownerName"),
        imageUrl:
          formData.get("imageUrl") ||
          "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
        age: parseInt(formData.get("age")),
        notes: formData.get("notes"),
      },
    });
  } catch (error) {
    return {
      message: "Error adding pet",
    };
  }

  revalidatePath("/app", "layout");
}

export async function editPet(id, formData) {
  await sleep(2000);
  try {
    await prisma.pet.update({
      where: { id },
      data: {
        name: formData.get("name"),
        ownerName: formData.get("ownerName"),
        imageUrl:
          formData.get("imageUrl") ||
          "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
        age: parseInt(formData.get("age")),
        notes: formData.get("notes"),
      },
    });
  } catch (error) {
    return {
      message: "Error editing pet",
    };
  }

  revalidatePath("/app", "layout");
}

export async function deletePet(id) {
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
