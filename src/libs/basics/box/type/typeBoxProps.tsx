import type { ComponentProps } from "react";
import type {
	RestyleBox,
	TypeBoxBorderProp,
	TypeBoxColorKey,
} from "./otherTypeBox";
import type { TypeShadowProps } from "./typeShadowProps";

export type TypeBoxProps = ComponentProps<typeof RestyleBox> &
	TypeShadowProps & {
		border?: TypeBoxBorderProp | TypeBoxColorKey;
	};
