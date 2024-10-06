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
        // age: parseInt(formData.get("age")),
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
