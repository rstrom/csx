import { InterpolationWithTheme, jsx, SerializedStyles } from "@emotion/core";
import React, { LegacyRef } from "react";
import { keys } from "./util";

/**
 * Constructs a "styled but not styled-component" component with optional
 * style variants/conditionals
 * @param baseStyles array of emotion/core style objects composed into a single base style, in order
 * @param conditionalStylesMap keys turn into boolean props, which control their values (empotion/core css values)
 * @param elementType html element type "button", "span", "svg" etc.
 */
export const csx = <
  E extends HTMLElement = HTMLDivElement,
  S extends string = ""
>(
  baseStyles: SerializedStyles[],
  conditionalStylesMap: Record<S, SerializedStyles> | {} = {},
  elementType: keyof React.ReactDOM = "div"
): React.FC<Partial<Record<S, boolean>> &
  React.DetailedHTMLProps<React.HTMLAttributes<E>, E> & {
    ref?: never;
    innerRef?: LegacyRef<E | null>;
    css?: InterpolationWithTheme<never>;
  }> => props => {
  const activeConditionals = keys(conditionalStylesMap)
    .filter(k => !!props[k])
    .map(k => conditionalStylesMap[k]);
  // remove conditional styles so they are not passed as html attr
  const nonStyleProps = keys(props)
    .filter(k => !(k in conditionalStylesMap) && k !== "innerRef")
    .reduce((p, k) => ({ ...p, [k]: props[k] }), {});
  return jsx(elementType, {
    ...nonStyleProps,
    ref: props.innerRef,
    css: [...baseStyles, ...activeConditionals, props.css]
  });
};
