import type { ComponentProps } from "react";
import type { TypeEnumColorValue } from "../../../../themes/colors/enum/enumColors";
import type {
	TypeBoxBorderProp,
	TypeBoxColorKey,
} from "../../box/type/otherTypeBox";
import type { TypeShadowProps } from "../../box/type/typeShadowProps";
import type { RestyleVScroll } from "./otherTypeVScroll";

export type TypeVScrollProps = ComponentProps<typeof RestyleVScroll> &
	TypeShadowProps & {
		border?: TypeBoxBorderProp | TypeBoxColorKey;
		colorFade?: TypeEnumColorValue;
	};
