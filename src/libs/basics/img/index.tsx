import { Image } from "react-native";
import type { TypeImgProps } from "./type/typeImgProps";

export function Img(props: TypeImgProps) {
	return <Image {...props} />;
}
