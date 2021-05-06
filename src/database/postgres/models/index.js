import pg from "pg";
import Logger from "../../../core/logger.js";
import seq from "sequelize";
const { Sequelize, DataType } = seq;
import { pgDB } from "../../../config.js";
import Article from "./article.js";
console.log(Article);
const sequelize = new Sequelize(pgDB.pgDatabase, pgDB.pgUser, pgDB.pgPassword, {
  port: pgDB.pgPort,
  host: pgDB.pgHost,
  dialect: "postgres",
});
//const Arti = Article(sequelize, DataType);
export const connectToPostgres = async () => {
  try {
    await sequelize.authenticate();
    Logger.info("Postgres connection established");
  } catch (e) {
    Logger.error(e);
  }
};

// const models = {
//   Article: Article(sequelize, DataType),
// };
// export const pool = new pg.Pool()
//
// export const query = async function (queryText, params) {
//   const start = Date.now()
//   const result = await pool.query(queryText, params)
//   const duration = Date.now() - start
//   console.log(`Query executed in ${duration} ms`)
//   return result
// }
