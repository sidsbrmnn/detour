module.exports = function() {
  const { PORT, NODE_ENV, DB_URI } = process.env;

  if (!PORT) {
    console.error("FATAR ERROR: PORT not defined.");
    process.exit(1);
  }
  if (!NODE_ENV) {
    console.error("FATAR ERROR: NODE_ENV not defined.");
    process.exit(1);
  }
  if (!DB_URI) {
    console.error("FATAR ERROR: DB_URI not defined.");
    process.exit(1);
  }
};
