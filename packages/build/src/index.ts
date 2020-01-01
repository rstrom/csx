import postcss from "postcss";
import postcssJs from "postcss-js";
import fs from "fs";
import path from "path";

const program = require("commander");

program
  .option("-i, --input <path>", "input css file")
  .option("-o, --output <path>", "output folder");

program.parse(process.argv);

const css = fs.readFileSync(path.resolve(program.input));
const root = postcss.parse(css);
const cssObj = postcssJs.objectify(root);

/* mutate css obj and return new class name */
function transformStateClass(mutableCssObj: Record<string, object>) {
  return (className: string) => {
    const stateRegex = /:(hover|focus|active|visited)$/;
    if (!stateRegex.test(className)) {
      return className;
    } else {
      const newClassName = className
        .replace(stateRegex, "")
        .replace("\\:", "_");
      const [, stateName] = className.match(stateRegex) || [];
      mutableCssObj[newClassName] = {
        [`&:${stateName}`]: mutableCssObj[className]
      };
      return newClassName;
    }
  };
}

function snakeCase(className: string) {
  return className.replace(/\./g, "").replace(/-/g, "_");
}

const tokens = Object.keys(cssObj)
  .map(transformStateClass(cssObj))
  .map(k => k.replace("\\:", "_"))
  .filter(k => !k.includes(":"))
  .map(k => [snakeCase(k), cssObj[k]])
  .sort(([k1], [k2]) => k1.localeCompare(k2))
  .reduce((a, [k, v]) => ({ ...a, [k]: v }), {});

const ts = `
import { ObjectInterpolation } from "@emotion/core";

const tokensUntyped = ${JSON.stringify(tokens)}

export const tokens = (tokensUntyped as unknown) as Record<
  keyof typeof tokensUntyped,
  ObjectInterpolation<undefined>
>;
`;

fs.writeFileSync(path.resolve(program.output, "tokens.csx.ts"), ts);
