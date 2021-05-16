import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const jwtPrivateKey = process.env.jwtPrivateKey;
const jwtExpiration = process.env.jwtExpiration;
const companyName = process.env.companyName;
const webSite = process.env.webSite;
const productName = process.env.productName;
const resetPasswordUrl = process.env.resetPasswordUrl;
const dbUrl = process.env.DATABASE_URL;
const db_host = process.env.db_host;
const db_username = process.env.db_username;
const db_password = process.env.db_password;
const db_database = process.env.db_database;
const db_port = process.env.db_port;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const email = {
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASSWORD,
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE,
  service: process.env.EMAIL_SERVICE,
};

export default {
  PORT,
  jwtPrivateKey,
  jwtExpiration,
  companyName,
  webSite,
  productName,
  resetPasswordUrl,
  email,
  dbUrl,
  db_host,
  db_password,
  db_username,
  db_database,
  db_port,
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  REFRESH_TOKEN,
};
