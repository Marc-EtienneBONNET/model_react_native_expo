import { createContext, type ReactNode, useMemo, useState } from "react";
import type { TypeHeure } from "./types/typeHeure";

export type TypeInputFieldValue =
	| string
	| number
	| Date
	| TypeHeure
	| undefined;

export type TypeInputsShape = Record<string, TypeInputFieldValue>;

type TypeNullable<T extends TypeInputsShape> = {
	[K in keyof T]: T[K] | undefined;
};

export type TypePropsInputs<T extends TypeInputsShape> = {
	values: TypeNullable<T>;
	setValues: { [K in keyof T]: (next: T[K] | undefined) => void };
	labels: { [K in keyof T & string]: K };
	errors: { [K in keyof T]: string | undefined };
	setErrors: { [K in keyof T]: (next: string | undefined) => void };
};

type TypeContextInputs = TypePropsInputs<TypeInputsShape>;

export const ContextInputs = createContext<TypeContextInputs | null>(null);

type TypeProviderProps<T extends TypeInputsShape> = {
	initialValues: TypeNullable<T>;
	children: ReactNode | ((ctx: TypePropsInputs<T>) => ReactNode);
};

export function ContextInputsProvider<T extends TypeInputsShape>({
	initialValues,
	children,
}: TypeProviderProps<T>) {
	const [_values, _updateValues] = useState<TypeNullable<T>>(initialValues);
	const [_errors, _updateErrors] = useState<{
		[K in keyof T]: string | undefined;
	}>(() => {
		const _init = {} as { [K in keyof T]: string | undefined };
		for (const _key of Object.keys(initialValues) as Array<keyof T>) {
			_init[_key] = undefined;
		}
		return _init;
	});

	const _setValues = useMemo(() => {
		const _s = {} as { [K in keyof T]: (next: T[K] | undefined) => void };
		for (const _key of Object.keys(initialValues) as Array<keyof T>) {
			_s[_key] = (next) =>
				_updateValues((prev) => {
					if (prev[_key] === next) return prev;
					return { ...prev, [_key]: next };
				});
		}
		return _s;
	}, []);

	const _labels = useMemo(() => {
		const _l = {} as { [K in keyof T & string]: K };
		for (const _key of Object.keys(initialValues) as Array<keyof T & string>) {
			_l[_key] = _key;
		}
		return _l;
	}, []);

	const _setErrors = useMemo(() => {
		const _s = {} as { [K in keyof T]: (next: string | undefined) => void };
		for (const _key of Object.keys(initialValues) as Array<keyof T>) {
			_s[_key] = (next) =>
				_updateErrors((prev) => {
					if (prev[_key] === next) return prev;
					return { ...prev, [_key]: next };
				});
		}
		return _s;
	}, []);

	const _ctx = useMemo<TypePropsInputs<T>>(
		() => ({
			values: _values,
			setValues: _setValues,
			labels: _labels,
			errors: _errors,
			setErrors: _setErrors,
		}),
		[_values, _setValues, _labels, _errors, _setErrors],
	);

	return (
		<ContextInputs.Provider value={_ctx as unknown as TypeContextInputs}>
			{typeof children === "function" ? children(_ctx) : children}
		</ContextInputs.Provider>
	);
}
