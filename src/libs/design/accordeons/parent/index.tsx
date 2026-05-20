import { Children, cloneElement, isValidElement } from "react";
import { VStack } from "../../../basics/vStack";
import type { TypeVStackProps } from "../../../basics/vStack/type/typeVStackProps";
import { useTranslation } from "../../../i18n";
import { AccordeonChild, type TypeAccordeonChildProps } from "../child";
import { ContextAccordeonParentProvider } from "./contextAccordeonParent";
import { EnumAccordeonVariant } from "./enum/enumAccordeonVariant";

export type TypeAccordeonParentProps = TypeVStackProps & {
	indexOpen?: number[];
	variant?: EnumAccordeonVariant;
};

export function AccordeonParent({
	indexOpen = [],
	variant = EnumAccordeonVariant.singleOpen,
	children,
	...props
}: TypeAccordeonParentProps) {
	const t = useTranslation("libs/accordeons");
	const _children = Children.toArray(children);
	const _withIndex = _children.map((child, _index) => {
		if (
			!isValidElement<TypeAccordeonChildProps>(child) ||
			child.type !== AccordeonChild
		) {
			throw new Error(t("errorInvalidChild"));
		}
		return cloneElement(child, { index: _index });
	});

	return (
		<ContextAccordeonParentProvider
			count={_children.length}
			indexOpen={indexOpen}
			variant={variant}
		>
			<VStack {...props}>{_withIndex}</VStack>
		</ContextAccordeonParentProvider>
	);
}
