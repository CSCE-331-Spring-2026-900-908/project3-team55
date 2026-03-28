const env = {
  DB_URL: process.env.PG_LINK,
  DB_USER: process.env.PG_USER,
  DB_NAME: process.env.PG_DB,
  DB_PORT: process.env.PORT,
  DB_PASS: process.env.PG_PASS
};

export default env;