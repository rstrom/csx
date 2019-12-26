import { InterpolationWithTheme, jsx, SerializedStyles } from "@emotion/core";
import React from "react";
import { keys } from "./util";

export const csx = <
  E extends HTMLElement = HTMLDivElement,
  S extends string = ""
>(
  baseStyle: SerializedStyles | SerializedStyles[],
  conditionalsObj: Record<S, SerializedStyles> | {} = {},
  elementType: keyof React.ReactDOM = "div"
): React.FC<Partial<Record<S, boolean>> &
  React.DetailedHTMLProps<React.HTMLAttributes<E>, E> & {
    css?: InterpolationWithTheme<never>;
  }> => props => {
  const baseStyles = Array.isArray(baseStyle) ? baseStyle : [baseStyle];
  const activeConditionals = keys(conditionalsObj)
    .filter(k => !!props[k])
    .map(k => conditionalsObj[k]);
  return jsx(elementType, {
    ...props,
    css: [...baseStyles, ...activeConditionals, props.css]
  });
};
