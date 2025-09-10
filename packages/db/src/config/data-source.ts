import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: "postgres://trader:postgres@database:5432/trading",
});

AppDataSource.initialize()
  .then(() => {
    console.log(`DB is connected`);
  })
  .catch((err) => {
    console.log(`Db connection failed`, err);
  });
