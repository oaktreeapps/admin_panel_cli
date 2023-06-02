import { capitalize } from "src/helpers/strings";

export const getConfigFile = (screenName: string) => {
  const screen = screenName.toLowerCase();

  return `/**
 * @typedef {import('../types').Screen} Screen
 */
const screen = {
  name: "${capitalize(screen)}",
  url: "/${screen}",
  collectionName: "${screen}",
  crudFields: [
    // ...
  ],
};

module.exports = screen;`;
};

export const getServerEnvFile = () => {
  return `REST_API_PORT=3005
MONGO_CONNECTION_URL=

#REDIS_PORT=6379
#REDIS_HOST=redis_dev


AUTH_PRIVATE_BASE64=
AUTH_PUBLIC_BASE64=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM_EMAIL=
SMTP_FROM_NAME=

S3_REGION=
S3_ACCESS_KEY=
S3_ACCESS_ID=
S3_BUCKET_NAME=

STATIC_S3_REGION=
STATIC_S3_BUCKET_NAME=
`;
};
