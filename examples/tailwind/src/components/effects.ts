import { css } from "@emotion/core";

export const inset = css`
  box-shadow: inset 0.25rem 0.25rem 0.25rem rgba(0, 0, 0, 0.9),
    inset -0.25rem -0.25rem 0.25rem rgba(255, 255, 255, 0.2);
`;

export const outset = css`
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0.5rem 0.5rem 0.5rem rgba(0, 0, 0, 0.05),
    -0.5rem -0.5rem 0.5rem rgba(255, 255, 255, 0.5);
`;
