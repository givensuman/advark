// @ts-nocheck

/** 
Creates a minified JS array of blacklisted URLs
Hostnames curated by Steven Black
https://github.com/StevenBlack/hosts
*/

const request = require("request");
const fs = require("fs");

const HOSTS_URL =
  "https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts";

request.get(HOSTS_URL, (err, res, body) => {
  if (!err && res.statusCode == 200) {
    const hosts = body
      .split("\n")
      .filter((line) => line.substring(0, 7) == "0.0.0.0")
      .map((line) => line.substring(8).split(" #")[0]);

    const file = fs.createWriteStream("hosts.js");
    const date = new Date();
    file.write(
      `// Last updated ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}\n`
    );
    file.write("export const hosts = [");
    hosts.forEach((line) => file.write('"' + line + '",'));
    file.write("]");
  }
});
