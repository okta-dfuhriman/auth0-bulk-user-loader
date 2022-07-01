require("dotenv").config();
const { currentTime } = require("./src/utils");
const { generateUserInfo } = require("./src/data-generation");
const { createConnection, createUser} = require("./src/db-connections");

const numUsers = Number(process.argv[2]);
if (!numUsers) {
  console.log("Please provide the number of users to create\n");
  process.exit(1);
}

async function main() {
  const connection = await createConnection();

  let usersAdded = 0;
  let waveSize;
  while (usersAdded < numUsers) {
    if (usersAdded === 0 || usersAdded % 4000 === 0) {
      console.log(currentTime());
      console.log(
        ` → Creating users ${usersAdded + 1} - ${usersAdded + 4000}`
      ) 
    }
    await createUserJob(connection.name);
    usersAdded += 1;
  }
}

async function createUserJob(connectionName) {
  try {
    const userInfo = generateUserInfo();
      await createUser(connectionName, userInfo)
  } catch(err) {
    console.log(err)
    process.exit(1)
  }
}

(async () => {
  try {
    await main();
  } catch (err) {
    console.error(err);
  }
})();
