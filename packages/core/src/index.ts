import { InterpolationWithTheme, jsx, SerializedStyles } from "@emotion/core";
import React from "react";
import { keys } from "./util";

type ElementFromTag<
  T extends keyof React.ReactHTML
> = React.ReactHTML[T] extends React.DetailedHTMLFactory<object, infer E>
  ? E
  : never;

type AttributesFromElement<T> = T extends React.DetailedHTMLFactory<
  infer U,
  infer _
>
  ? U
  : never;

/**
 * Constructs a "styled but not styled-component" component with optional
 * style variants/conditionals
 * @param baseStyles array of emotion/core style objects composed into a single base style, in order
 * @param conditionalStylesMap keys turn into boolean props, which control their values (empotion/core css values)
 * @param elementType html element type "button", "span", "svg" etc.
 */
export const csx = <
  S extends string = "",
  T extends keyof React.ReactHTML = "div"
>(
  baseStyles: SerializedStyles[],
  conditionalStylesMap: Partial<Record<S, SerializedStyles>> = {},
  elementType?: T
) => {
  return React.forwardRef<
    ElementFromTag<T>,
    Partial<{ [key in S]: boolean }> &
      AttributesFromElement<React.ReactDOM[T]> &
      React.PropsWithChildren<{
        css?: InterpolationWithTheme<never>;
      }>
  >((props, ref) => {
    const activeConditionals = keys(conditionalStylesMap)
      .filter(k => !!props[k])
      .map(k => conditionalStylesMap[k]);
    // remove conditional styles so they are not passed as html attr
    const nonStyleProps = keys(props)
      .filter(k => !(k in conditionalStylesMap))
      .reduce((p, k) => ({ ...p, [k]: props[k] }), {});
    return jsx(elementType ?? "div", {
      ...nonStyleProps,
      ref: ref,
      css: [...baseStyles, ...activeConditionals, props.css]
    });
  });
};
