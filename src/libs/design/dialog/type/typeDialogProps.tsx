import type { PropsWithChildren } from "react";
import type { TypeTouchableOpacityProps } from "../../../basics/touchableOpacity/type/typeTouchableOpacityProps";

export type TypeDialogProps = PropsWithChildren<TypeTouchableOpacityProps> & {
	isOpen: boolean;
	canClose?: boolean;
	onClose: () => void;
};
