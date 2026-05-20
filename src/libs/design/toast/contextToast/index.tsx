import { createContext, type PropsWithChildren, useState } from "react";
import type { TypeEnumColorValue } from "../../../../themes/colors/enum/enumColors";
import type { EnumToastVariant } from "../variant/enumToastVariant";

export type TypePropsToast = {
	title: string;
	subtitle?: string;
	duration?: number;
	toastVariant?: keyof typeof EnumToastVariant;
	colorSchema?: TypeEnumColorValue;
};

type TypeContextToast = {
	toast: TypePropsToast | undefined;
	newToast: React.Dispatch<React.SetStateAction<TypePropsToast | undefined>>;
};

export const ContextToast = createContext<TypeContextToast | null>(null);

export function ContextToastProvider({ children }: PropsWithChildren) {
	const [_toast, _setToast] = useState<TypePropsToast | undefined>(undefined);

	return (
		<ContextToast.Provider value={{ toast: _toast, newToast: _setToast }}>
			{children}
		</ContextToast.Provider>
	);
}
