const fs = require("fs");
const os = require("os");
const path = require("path");
const { promisify } = require("util");
const { name, random } = require("faker");

const writeFileAsync = promisify(fs.writeFile);

/*function generateUserInfo() {
  const email = `${name.firstName()}.${name.lastName()}-${random.number(
    100000
  )}@fakefake.com`;

  return {
    connection: "Username-Password-Authentication",
    email,
    password_hash: "$2a$10$nfKTyUeJEFvxkZbZkDMfWuemxHKI6YlTZB6l/g64VnEC8hgf4Ycee",
    user_metadata: { "theme" : "dark"},
    app_metadata : {"org" : "ca", roles : ["supervisor"], "entitlements" : ["do-some", "delete-some"]}
  };
}*/

function generateUserInfo() {
  const email = `${name.firstName()}.${name.lastName()}-${random.number(
    10000000
  )}@fakefake.com`;
  var GTMScreened = random.number(100) % 2 === 0 ? "Complete" : "N";
  return {
    connection: "Username-Password-Authentication",
    email,
    password_hash: "$2a$10$nfKTyUeJEFvxkZbZkDMfWuemxHKI6YlTZB6l/g64VnEC8hgf4Ycee",
    user_metadata: { "division" : "abc",
                      "companyName" : "xyz",
                      "country" : "US",
                      "jobTitle" :  "Senior" },
    app_metadata : {
                "GTMScreened" : GTMScreened,
                "customerProfileFlag" : true,
                "emailDomain" : "fakefake.com"}
  };
}

const generateArrayOfUsers = numUsers => {
  return new Array(numUsers).fill(null).map(generateUserInfo);
};

const generateUsersJson = async (numUsers) => {
  const arrayOfUsers = generateArrayOfUsers(numUsers);
  const usersJson = JSON.stringify(arrayOfUsers);
  const pathToJson = tempPathToJson();

  await writeFileAsync(pathToJson, usersJson);
  if (process.env.DEBUG) console.log(`User data generated: ${pathToJson}`);
  return pathToJson;
};

function tempPathToJson() {
  const tempDir = os.homedir + "/bulk-files/"
  return path.join(tempDir, `user-data-${random.number(100000)}.json`);
}

module.exports = {
  generateUsersJson,
  generateUserInfo
};
