import { useEffect } from "react";
import type { TypePropsToast } from "../../libs/design/toast/contextToast";
import { useContextToast } from "../../libs/design/toast/contextToast/hooks/useContextToast";

export function useToast({
	propsToast,
	isOpen,
}: {
	propsToast: TypePropsToast;
	isOpen: boolean;
}) {
	const { newToast } = useContextToast();

	useEffect(() => {
		if (isOpen) {
			newToast(propsToast);
		} else {
			newToast(undefined);
		}
	}, [isOpen, newToast, propsToast]);
}
