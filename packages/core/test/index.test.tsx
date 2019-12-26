import css from "@emotion/css";
import React from "react";
import { csx } from "../src/index";
import renderer from "react-test-renderer";
import serializer from "jest-emotion";

expect.addSnapshotSerializer(serializer);

describe("Styling a Button component", () => {
  it("works", () => {
    const Button = csx(
      css`
        color: red;
      `,
      {
        foo: css`
          color: green;
        `,
        bar: css`
          color: yellow;
        `
      },
      "button"
    );
    const tree = renderer.create(<Button foo bar={false} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
