import type { TypeBoxBorderProp, TypeBoxColorKey } from "../type/otherTypeBox";

type TypeBorderStyle = {
	borderWidth: number;
	borderStyle: "solid";
	borderColor: TypeBoxColorKey;
};

export function getBorder(
	border?: TypeBoxBorderProp | TypeBoxColorKey,
): TypeBorderStyle | {} {
	if (!border) {
		return {};
	} else if (!border.includes(" ")) {
		return {
			borderWidth: 3,
			borderStyle: "solid",
			borderColor: border as TypeBoxColorKey,
		};
	} else {
		const [width, color] = border.split(" ");
		return {
			borderWidth: Number(width),
			borderStyle: "solid",
			borderColor: color as TypeBoxColorKey,
		};
	}
}
