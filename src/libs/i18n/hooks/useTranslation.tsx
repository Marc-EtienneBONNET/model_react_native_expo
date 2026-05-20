import { useCallback } from "react";
import {
	type TypeLocale,
	type TypeNamespace,
	translations,
} from "../translations";

const _DEFAULT_LOCALE: TypeLocale = "fr";

function _lookup(dict: unknown, path: string): string | undefined {
	const _segments = path.split(".");
	let _current: unknown = dict;
	for (const _seg of _segments) {
		if (_current && typeof _current === "object" && _seg in _current) {
			_current = (_current as Record<string, unknown>)[_seg];
		} else {
			return undefined;
		}
	}
	return typeof _current === "string" ? _current : undefined;
}

function _interpolate(
	template: string,
	params?: Record<string, string | number | boolean>,
): string {
	if (!params) return template;
	let _result = template;
	for (const [_key, _value] of Object.entries(params)) {
		_result = _result.split(`{${_key}}`).join(String(_value));
	}
	return _result;
}

export function useTranslation(namespace: TypeNamespace) {
	const _dict = translations[_DEFAULT_LOCALE][namespace];

	return useCallback(
		(
			key: string,
			params?: Record<string, string | number | boolean>,
		): string => {
			const _raw = _lookup(_dict, key);
			if (_raw === undefined) return key;
			return _interpolate(_raw, params);
		},
		[_dict],
	);
}
