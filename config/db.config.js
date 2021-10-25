module.exports = {
  HOST: "database-1.cinibtozq2y8.ap-southeast-1.rds.amazonaws.com",
  USER: "admin",
  PASSWORD: "Welcome#1",
  DB: "new_schema",
  dialect: "mysql",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
