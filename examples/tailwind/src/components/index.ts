import { csx } from "@csx/core";
import { css } from "@emotion/core";
import { tokens } from "./tokens.csx";
import { inset, outset } from "./effects";

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
  [
    css`
      font-weight: bold;
      outline: none;
      border: none;
      padding: 0.5rem;
      border-radius: 0.5rem;
      color: black;
      background: #eeeeff;
      cursor: pointer;
    `,
    outset
  ],
  tokens,
  "button"
);

export const Code = csx(
  [
    css`
      color: white;
      background: rgba(0, 0, 0, 0.8);
      padding: 0.5rem 1rem;
      border-radius: 0.125rem;
    `,
    inset
  ],
  tokens,
  "code"
);

export const Card = csx(
  [
    css`
      background: #efeeff;
      padding: 1rem;
      border-radius: 1rem;
    `,
    outset
  ],
  tokens
);
