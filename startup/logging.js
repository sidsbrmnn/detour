module.exports = function() {
  process.on("unhandledRejection", ex => {
    throw new Error(ex);
  });

  process.on("uncaughtException", ex => {
    throw new Error(ex);
  });
};
