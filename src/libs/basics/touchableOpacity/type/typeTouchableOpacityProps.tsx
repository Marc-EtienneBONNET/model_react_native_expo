import type { ComponentProps } from "react";
import type {
	TypeBoxBorderProp,
	TypeBoxColorKey,
} from "../../box/type/otherTypeBox";
import type { TypeShadowProps } from "../../box/type/typeShadowProps";
import type { RestyleTouchableOpacity } from "./otherTypeTouchableOpacity";

export type TypeTouchableOpacityProps = ComponentProps<
	typeof RestyleTouchableOpacity
> &
	TypeShadowProps & {
		border?: TypeBoxBorderProp | TypeBoxColorKey;
	};
