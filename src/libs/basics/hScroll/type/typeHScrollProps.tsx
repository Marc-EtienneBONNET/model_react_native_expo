import type { ComponentProps } from "react";
import type { TypeEnumColorValue } from "../../../../themes/colors/enum/enumColors";
import type {
	TypeBoxBorderProp,
	TypeBoxColorKey,
} from "../../box/type/otherTypeBox";
import type { TypeShadowProps } from "../../box/type/typeShadowProps";
import type { RestyleHScroll } from "./otherTypeHScroll";

export type TypeHScrollProps = ComponentProps<typeof RestyleHScroll> &
	TypeShadowProps & {
		border?: TypeBoxBorderProp | TypeBoxColorKey;
		colorFade?: TypeEnumColorValue;
	};
