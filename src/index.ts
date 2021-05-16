import "reflect-metadata";
import { createConnection, Db } from "typeorm";
import startServer from "./server/startServer";
import config from "./config";

createConnection({
  type: "postgres",
  url: `${config.dbUrl}`,
  // ssl: true,
  // extra: {
  //   ssl: {
  //     rejectUnauthorized: false,
  //   },
  // },
  synchronize: true,
  logging: false,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
})
  .then(async () => {
    return startServer();
  })
  .catch((error) => console.log(error));
