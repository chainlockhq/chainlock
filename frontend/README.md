# Chainlock Frontend

## Environment Variables

Read up on: https://create-react-app.dev/docs/adding-custom-environment-variables/

> 💡 Only environment variables that start with `REACT_APP_` will be included in the build.

> 🚨 Contrary to the `.env` file used by hardhat, the `.env` file of the frontend SHOULD NEVER contain secrets.
> These environment variables are embedded into the source code at build time and will be VISIBLE by every user of the app.

> 💡 You can copy `.env` to `.env.local` and make changes for testing locally. The frontend needs to be restarted (`npm start`) before it can pick up the changes.
