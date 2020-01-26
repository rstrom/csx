import React, { ReactNode } from "react";
import { Header } from ".";
import { csx } from "@csx/core";
import { css } from "@emotion/core";
import { tokens } from "./tokens.csx";

const DialogWrapper = csx(
  css`
    border-radius: 1rem;
  `,
  tokens
);

const DialogHeader = csx(
  css`
    color: red;
  `,
  tokens,
  "h1"
);

export const Dialog = (props: {
  children: {
    Header: ReactNode;
    Body: ReactNode;
  };
}) => {
  return (
    <DialogWrapper>
      <Header>{props.children}</Header>
    </DialogWrapper>
  );
};

Dialog.Header = DialogHeader;
