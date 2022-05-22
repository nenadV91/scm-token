const main = require("../utils/main");
const path = require("path");
const fs = require("fs");

const clientDir = path.resolve(
  __dirname,
  "../..",
  "client-app",
  "addresses.json"
);

main()
  .then((result) => {
    const output = JSON.stringify({
      weth: result.weth.address,
      ico: result.ico.address,
      scm: result.scm.address,
    });

    fs.writeFile(clientDir, output, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("Addresses file is saved!");
      process.exit(0);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
