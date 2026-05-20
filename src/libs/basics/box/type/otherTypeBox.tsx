import { createBox } from "@shopify/restyle";
import type { TypeTheme } from "../../../../themes/enum/typeTheme";

export const RestyleBox = createBox<TypeTheme>();

export type TypeBoxColorKey = keyof TypeTheme["colors"] & string;

export type TypeBoxBorderProp = `${number} ${TypeBoxColorKey}`;
