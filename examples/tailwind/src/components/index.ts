import { csx } from "@csx/core";
import { css } from "@emotion/core";
import { tokens } from "./tokens.csx";

export const Stack = csx(
  css`
    display: flex;
  `,
  tokens
);

export const Header = csx(
  css`
    text-decoration: wavy underline lime;
  `,
  tokens,
  "h1"
);

export const Button = csx(
  css`
    background: red;
  `,
  tokens,
  "button"
);

export const Code = csx(
  css`
    color: white;
    background: black;
    padding: 0.25rem;
  `,
  tokens,
  "code"
);
