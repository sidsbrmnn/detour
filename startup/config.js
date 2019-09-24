module.exports = function() {
  const { PORT, NODE_ENV, MONGODB_URI, JWT_SECRET } = process.env;

  if (!PORT) {
    console.error("FATAR ERROR: PORT not defined.");
    process.exit(1);
  }
  if (!NODE_ENV) {
    console.error("FATAR ERROR: NODE_ENV not defined.");
    process.exit(1);
  }
  if (!MONGODB_URI) {
    console.error("FATAR ERROR: MONGODB_URI not defined.");
    process.exit(1);
  }
  if (!JWT_SECRET) {
    console.error("FATAR ERROR: JWT_SECRET not defined.");
    process.exit(1);
  }
};
