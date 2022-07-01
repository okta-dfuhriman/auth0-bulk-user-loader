require("dotenv").config();
const { pause, currentTime } = require("./src/utils");
const { generateUsersJson } = require("./src/data-generation");
const { createConnection, importUsers } = require("./src/db-connections");

const maxUsersToAdd = process.env.MAX_USERS_PER_IMPORT || 1700; // Below the 500KB limit

const numUsers = Number(process.argv[2]);
if (!numUsers) {
  console.log("Please provide the number of users to create\n");
  process.exit(1);
}

async function main() {

  
  //await createBulkUserFiles(numUsers,2000);
  const connection = await createConnection();
  
  let jobCount = 0;
  let usersAdded = 0;
  while (usersAdded < numUsers) {
    const usersRemaining = numUsers - usersAdded;
    const numUsersToAdd = Math.min(maxUsersToAdd, usersRemaining);

    await createBulkUserJob(numUsersToAdd, connection.id);

    jobCount += 1;
    usersAdded += numUsersToAdd;
    console.log(`\nJob created ${jobCount} - ${currentTime()}`);
    console.log(
      ` → Creating users ${usersAdded - numUsersToAdd + 1} - ${usersAdded}`
    );
  }
}

async function createBulkUserJob(numUsers, connectionId) {
  const pathToJson = await generateUsersJson(numUsers);

  let jobSuccess = false;
  while (!jobSuccess) {
    try {
      var job = await importUsers(connectionId, pathToJson);
      console.log(job.body);
      jobSuccess = true;
        } catch (e) {
      
      // The job queue is full
      if (e.status === 429) {
        await pause(8000);
      } else if (process.env.DEBUG) console.log(e);
    }
  }
}

async function createBulkUserFiles(numUsers, noOfFiles) {
  for (let index = 0; index < noOfFiles; index++) {

    const pathToJson = await generateUsersJson(numUsers);
    console.log(pathToJson)
  }

}

(async () => {
  try {
    await main();
  } catch (err) {
    console.error(err);
  }
})();
