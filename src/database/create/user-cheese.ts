import prisma from "../prisma";

export async function createUserCheese(addressId: string) {
  try {
    const cheese = await prisma.cheese.create({
      data: {
        addressId: addressId,
      },
    });
  } catch (error) {
    console.error(error);
    return false;
  }
}
