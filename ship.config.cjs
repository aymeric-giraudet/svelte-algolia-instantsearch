module.exports = {
  beforePublish: ({ exec }) => {
    exec("cd package");
  },
};
