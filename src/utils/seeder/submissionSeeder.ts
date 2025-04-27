// src/utils/seeder/seedSubmissions.ts
import { faker } from "@faker-js/faker";
import { Submission } from "../../models/submission";
import { SubmissionFiles } from "../../models/submissionFiles";
import { Proponent } from "../../models/proponent";

const seedSubmissions = async (count = 20) => {
  try {
    const proponents = await Proponent.findAll();

    if (proponents.length === 0) {
      console.error("❌ No proponents found. Seed proponents first.");
      process.exit(1);
    }

    const lastSubmission = await Submission.findOne({
      order: [["id", "DESC"]],
    });

    const lastId = lastSubmission?.id || 0;

    for (let i = 0; i < count; i++) {
      const proponent =
        proponents[Math.floor(Math.random() * proponents.length)];
      const fileType = ["Link", "File"][Math.floor(Math.random() * 2)];
      const statuses = ["OnHold"];
      const submissionStatus =
        statuses[Math.floor(Math.random() * statuses.length)];

      const newSubmissionId = `SUB-${String(lastId + i + 1).padStart(4, "0")}`;

      const submission = await Submission.create({
        submissionId: newSubmissionId,
        proponentId: proponent.id,
        fileType,
        proposalTitle: faker.lorem.words(5),
        proposalDescription: faker.lorem.sentences(2),
        submissionStatus,
      });

      const numFiles = faker.number.int({ min: 1, max: 3 });
      const fileLinks = Array.from({ length: numFiles }, () =>
        faker.internet.url()
      );

      const fileRecords = fileLinks.map((link) => ({
        submissionId: submission.id,
        resourcesLink: link,
      }));

      await SubmissionFiles.bulkCreate(fileRecords);

      console.log(`✅ Seeded Submission: ${newSubmissionId}`);
    }

    console.log("✅ Submission seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding submissions:", error);
    process.exit(1);
  }
};

seedSubmissions(10000);
