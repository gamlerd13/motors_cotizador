import { PrismaClient } from "@prisma/client";

import { hash } from "bcrypt-ts";

const prisma = new PrismaClient();

const users = [
  {
    username: "admin",
    email: "admin@example.com",
    password: "admin",
  },
  {
    username: "kedevs",
    email: "kedevs@example.com",
    password: "kedevs",
  },
];
export const clients = [
  {
    name: "Juan Pérez",
    contact: "juan.perez@example.com",
    ruc: "20123456789",
    reference: "Cliente preferencial",
  },
  {
    name: "María Rodríguez",
    contact: "maria.rodriguez@example.com",
    ruc: "20234567890",
    reference: "Proveedor internacional",
  },
  {
    name: "Carlos García",
    contact: "carlos.garcia@example.com",
    ruc: "20345678901",
    reference: "Cliente recurrente",
  },
];
async function main() {
  const userDB = await prisma.user.count();
  if (userDB != 0) return console.log("!!Ya tiene usuario creado");

  const listUsers = await Promise.all(
    users.map(async (user) => ({
      ...user,
      password: await hash(user.password, 10),
    }))
  );

  const user = await prisma.user.createMany({
    data: listUsers,
    skipDuplicates: true,
  });

  const client = await prisma.client.createMany({
    data: clients,
    skipDuplicates: true,
  });

  console.log({ user }, { client });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
