const { ManagementClient } = require("auth0");

const managementClient = new ManagementClient({
  domain: process.env.DOMAIN,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

async function createConnection() {

  if(process.env.connection_id) return { id: process.env.connection_id}
  return managementClient.createConnection({
    name: `bulk-test`,
    strategy: "auth0",
    enabled_clients: [process.env.CLIENT_ID]
  });
}

async function importUsers(connectionId, pathToUserJson) {
  return managementClient.importUsers({
    connection_id: connectionId,
    users: pathToUserJson
  });
}

async function createUser(connectionName, userData) {
  return managementClient.createUser({
    connection: connectionName,
    ...userData
  });
}

module.exports = {
  createConnection,
  createUser,
  importUsers
};
