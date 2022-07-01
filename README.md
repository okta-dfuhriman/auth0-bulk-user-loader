<h3 align="center">bulk-user-generation</h3>
<p align="center">Generate users and perform a bulk import</p>

---

## Usage

Name: Auth0 Labs
Id: auth0.vscode-labs
Description: A Visual Studio Code extension for training lab automation and quick access to tenant information.
Version: 1.3.4
Publisher: Auth0
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=auth0.vscode-labs

### 1. Create a copy of `example.env` named `.env`:

```sh
  cp example.env .env
```

### 2. Install Auth0 Labs VSCode Extension (Optional)

The Auth0 Labs extension makes it really easy to manage your tenant directly in VS Code to do things like create an application, which you'll need to do in the next step.

For more details, check out the [extension](https://marketplace.visualstudio.com/items?itemName=auth0.vscode-labs).

### 3. Create a DB Connection (Optional)

1. If you do not have an existing DB connection, you have two options:
1. Auto-create the database using values set in this script's configuration. _(recommended)_
1. [Create a new database connection](https://auth0.com/docs/authenticate/database-connections) via the UI.

_If you went with option 2, make sure to hang onto the `Identifier` for the next step._

### 3. Gather & Set Configuration Values

1. Grab the `Id` from the Auth0 Management API's `Settings` tab.
2. If you created your own connection or are using an existing connection, grab the `Identifier` from the connection settings.

| UI Field/Name |     | .env Value      | How to find it                                                                                                                                                                        |
| ------------- | --- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Id`          | =>  | `CLIENT_ID`     | `Applications` > `APIs` > `Auth0 Management API` > `Settings`                                                                                                                         |
| `Token`       | =>  | `CLIENT_SECRET` | `Applications` > `APIs` > `Auth0 Management API` > `API Explorer` <br>[Instructions](https://auth0.com/docs/secure/tokens/access-tokens/get-management-api-access-tokens-for-testing) |
| `Tenant Name` | =>  | `DOMAIN`        | `Settings` > `General` <br> <em>Make sure to insert the tenant name into a url like in the `example.env` file.</em>                                                                   |
| `Identifier`  | =>  | `CONNECTION_ID` | `Authentication` > `Database`                                                                                                                                                         |

1. Create
1. Populate `.env` with configuration for your environment

1. Install dependencies

   ```sh
     npm install
   ```

1. Perform user generation and import

   ```sh
     npm start -- <number_of_users>
   ```
