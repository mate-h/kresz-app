import fs from "fs";
import parser from "xml-parser";
async function main() {
  // read raw data
  const stringData = fs.readFileSync("../src/lib/raw-data/cat-c-1.xml");

  // parse xml
  const data = parser.parse(stringData);

  // loop over data
  
}

main();