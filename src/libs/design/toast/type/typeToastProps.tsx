import type { TypeEnumColorValue } from "../../../../themes/colors/enum/enumColors";
import type { TypeBoxProps } from "../../../basics/box/type/typeBoxProps";
import type { EnumToastVariant } from "../variant/enumToastVariant";

export type TypeToastProps = TypeBoxProps & {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	subtitle?: string;
	duration?: number;
	toastVariant?: keyof typeof EnumToastVariant;
	colorSchema?: TypeEnumColorValue;
};
