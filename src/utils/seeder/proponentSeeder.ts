// seeders/seedProponents.ts
import { faker } from "@faker-js/faker";
import { Proponent } from "../../models/proponent";
import { hashPassword } from "../../auth";

const seedProponents = async (numProponents: number = 5) => {
  try {
    const lastProponent = await Proponent.findOne({ order: [["id", "DESC"]] });
    const lastId = lastProponent?.id || 0;

    for (let i = 0; i < numProponents; i++) {
      const departmentId = 1;
      const proponentType = "Insider";
      const proponentStatus = "Pending";
      const fullName = faker.person.fullName();
      const email = faker.internet.email();
      const password = faker.internet.password();
      const proponentsEmailExist = await Proponent.findOne({
        where: { email },
      });

      if (proponentsEmailExist) {
        console.warn(`Email already exists: ${email} - Skipping...`);
        continue;
      }

      const generatedId =
        proponentType === "Insider"
          ? `IN-${String(lastId + i + 1).padStart(4, "0")}`
          : `OUT-${String(lastId + i + 1).padStart(4, "0")}`;

      const existingId = await Proponent.findOne({
        where: { proponentId: generatedId },
      });

      if (existingId) {
        console.warn(
          `ProponentId already exists: ${generatedId} - Skipping...`
        );
        continue;
      }

      const hashedPassword = await hashPassword(password);

      const proponent = await Proponent.create({
        proponentId: generatedId,
        departmentId,
        proponentType,
        proponentStatus,
        fullName,
        email,
        password: hashedPassword,
      });

      console.log(`✅ Created: ${email}`);
    }

    console.log("✅ Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    process.exit(1);
  }
};

seedProponents(10000);
