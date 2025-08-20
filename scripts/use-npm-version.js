const fs = require("fs");
const path = require("path");

const pkgPath = path.join(__dirname, "../apps/website/package.json");
const pkg = require(pkgPath);

if (process.env.NODE_ENV === "production") {
  // Replace workspace:* with the actual NPM version
  pkg.dependencies["@ebrai/strive"] = "^0.1.70";
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  console.log("Switched @ebrai/strive to NPM version for production build");
}
