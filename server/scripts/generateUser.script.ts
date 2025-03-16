import fs from "fs/promises";
import readlinePromises from "node:readline/promises";
import bcrypt from "bcrypt";

/// * types
import { IUser } from "../../types/User.types";

async function run() {
  try {
    const userCollection: IUser[] = JSON.parse(
      await fs.readFile("db/users.db.txt", "utf-8")
    );

    const rl = readlinePromises.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const username: string = await rl.question("Enter username: ");

    const firstName: string = await rl.question("Enter first name: ");

    const lastName: string = await rl.question("Enter last name: ");

    const password: string = await rl.question("Enter password: ");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      username,
      firstName,
      lastName,
      password: hashedPassword,
      avatar: `/images/avatars/${username}.jpg`,
    };

    userCollection.push(user);

    await fs.writeFile("db/users.db.txt", JSON.stringify(userCollection));

    console.log("USER CREATED SUCCESSFULLY");

    process.exit(0);
  } catch (error: any) {
    console.error("ERROR: ", error.message);
    process.exit(1);
  }
}

run();
