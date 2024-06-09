// eslint-disable-next-line @typescript-eslint/no-var-requires
const { default: dbConfig } = require("src/config/database.config");

module.exports = {
  ...dbConfig,
  entities: ["src/**/*.entity.{ts,js}"],
  // seeds: ["src/database/seeders/seeds/**/*{js,ts}"],
  // factories: ["src/database/seeders/factories/**/*{js,ts}"],
};
