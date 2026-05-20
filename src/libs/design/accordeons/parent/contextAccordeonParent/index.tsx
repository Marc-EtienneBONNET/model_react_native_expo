import {
	createContext,
	type PropsWithChildren,
	useCallback,
	useMemo,
	useState,
} from "react";
import { EnumAccordeonVariant } from "../enum/enumAccordeonVariant";

export type TypeContextAccordeonParent = {
	values: Record<number, boolean>;
	setValue: (index: number, value: boolean) => void;
};

export const ContextAccordeonParent =
	createContext<TypeContextAccordeonParent | null>(null);

type TypeProviderProps = PropsWithChildren<{
	count: number;
	indexOpen: number[];
	variant: EnumAccordeonVariant;
}>;

export function ContextAccordeonParentProvider({
	count,
	indexOpen,
	variant,
	children,
}: TypeProviderProps) {
	const [_values, _setValues] = useState<Record<number, boolean>>(() =>
		buildInitialValues(count, indexOpen),
	);

	const _setValue = useCallback(
		(index: number, value: boolean) => {
			_setValues((prev) => {
				if (prev[index] === value) return prev;
				if (variant === EnumAccordeonVariant.singleOpen && value === true) {
					const _next: Record<number, boolean> = {};
					for (const _key of Object.keys(prev)) _next[Number(_key)] = false;
					_next[index] = true;
					return _next;
				}
				return { ...prev, [index]: value };
			});
		},
		[variant],
	);

	const _ctx = useMemo<TypeContextAccordeonParent>(
		() => ({ values: _values, setValue: _setValue }),
		[_values, _setValue],
	);

	return (
		<ContextAccordeonParent.Provider value={_ctx}>
			{children}
		</ContextAccordeonParent.Provider>
	);
}

function buildInitialValues(
	count: number,
	indexOpen: number[],
): Record<number, boolean> {
	const _init: Record<number, boolean> = {};
	const _openSet = new Set(indexOpen);
	for (let _i = 0; _i < count; _i++) _init[_i] = _openSet.has(_i);
	return _init;
}
