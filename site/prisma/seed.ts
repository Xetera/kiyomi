import { generateUserToken } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { run as aliases } from "@/scripts/migrations/aliases";
const prisma = new PrismaClient();

const url = "http://localhost:3000";
async function main() {
  const role = {
    name: "ADMINISTRATOR",
  };
  const jiubot = await prisma.user.upsert({
    where: { email: "bot@kiyomi.io" },
    update: {
      image: "https://my.simp.pics/ymT4UWHNEeBFtn-x.webp",
      roles: {
        create: role,
      },
    },
    create: {
      email: "bot@kiyomi.io",
      image: "https://my.simp.pics/ymT4UWHNEeBFtn-x.webp",
      name: "JiuBot",
      bot: true,
      token: generateUserToken(),
      roles: {
        create: role,
      },
    },
  });
  console.log(`Generated JiuBot with token ${jiubot.token}`);
  await aliases(url);
  const slug = "WJS3Kjac-wHnxzJX";
  await prisma.image.upsert({
    where: { slug },
    update: { userId: jiubot.id },
    create: {
      userId: jiubot.id,
      width: 1500,
      height: 1518,
      bytes: 940682,
      public: true,
      mimetype: "WEBP",
      hash: "",
      slug,
      uploadType: "TOKEN",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
