import { encoded, translations } from "./data.js";

const keysNeedRuleOut = ["groupId", "service", "formatSize", "ca"];

export const decoded = encoded.map((item) => {
  const newObj = {};
  for (const key in item) {
    const value = item[key];
    if (
      key.endsWith("Id") &&
      !keysNeedRuleOut.includes(key) &&
      translations[value]
    ) {
      newObj[key] = translations[value];
    } else {
      newObj[key] = value;
    }
  }
  return newObj;
});

console.log("Encoded", encoded);
console.log("Translations", translations);
console.log("Decoded:", decoded);

const uniqueIds = [...new Set(Object.keys(translations))];
console.log("Uniq Id:", uniqueIds);
