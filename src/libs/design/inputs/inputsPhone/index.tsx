import { PhoneIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import type { TextInputProps } from "react-native";
import { EnumGap } from "../../../../themes/spacing";
import { Icon } from "../../../basics/icon";
import { useTranslation } from "../../../i18n";
import { Btn } from "../../buttons";
import { useContextInputs } from "../contextInput/hooks/useContextInputs";
import { InputText } from "../inputsText";
import type { EnumInputSize } from "../inputsText/size/enumInputSize";

type TypeInputPhoneProps = Omit<
	TextInputProps,
	| "value"
	| "onChangeText"
	| "keyboardType"
	| "autoCapitalize"
	| "autoCorrect"
	| "secureTextEntry"
> & {
	label: string;
	title?: string;
	helper?: string;
	setError?: (value: string) => string | undefined;
	size?: EnumInputSize;
	isSecret?: boolean;
};

type TypeCountryCode = {
	prefix: string;
	labelKey: string;
	digits: number;
	groups: number[];
};

const COUNTRY_CODES: TypeCountryCode[] = [
	{
		prefix: "+33",
		labelKey: "phone.countries.france",
		digits: 9,
		groups: [1, 2, 2, 2, 2],
	},
	{
		prefix: "+32",
		labelKey: "phone.countries.belgique",
		digits: 9,
		groups: [3, 2, 2, 2],
	},
	{
		prefix: "+41",
		labelKey: "phone.countries.suisse",
		digits: 9,
		groups: [2, 3, 2, 2],
	},
	{
		prefix: "+34",
		labelKey: "phone.countries.espagne",
		digits: 9,
		groups: [3, 3, 3],
	},
	{
		prefix: "+44",
		labelKey: "phone.countries.royaumeUni",
		digits: 10,
		groups: [4, 6],
	},
	{
		prefix: "+1",
		labelKey: "phone.countries.usaCanada",
		digits: 10,
		groups: [3, 3, 4],
	},
	{
		prefix: "+49",
		labelKey: "phone.countries.allemagne",
		digits: 11,
		groups: [3, 4, 4],
	},
];

function formatPhoneGrouped(rawDigits: string, groups: number[]): string {
	if (rawDigits.length === 0) return "";
	const _parts: string[] = [];
	let _index = 0;
	for (const _size of groups) {
		if (_index >= rawDigits.length) break;
		_parts.push(rawDigits.slice(_index, _index + _size));
		_index += _size;
	}
	return _parts.join(" ");
}

function stripKnownPrefix(value: string): {
	prefix: string | undefined;
	digits: string;
} {
	for (const _c of COUNTRY_CODES) {
		if (value.startsWith(_c.prefix)) {
			return { prefix: _c.prefix, digits: value.slice(_c.prefix.length) };
		}
	}
	return { prefix: undefined, digits: value };
}

const PLACEHOLDER_DIGITS = "612345678901234";

export function InputPhone({
	setError,
	label,
	isSecret = false,
	placeholder,
	...props
}: TypeInputPhoneProps) {
	const t = useTranslation("libs/inputs");
	const { values, setErrors, setValues } = useContextInputs();

	const [_country, _setCountry] = useState<TypeCountryCode>(() => {
		const _raw = values[label];
		if (typeof _raw === "string") {
			const _detected = COUNTRY_CODES.find((_c) => _raw.startsWith(_c.prefix));
			if (_detected !== undefined) return _detected;
		}
		return COUNTRY_CODES[0];
	});

	const _placeholder =
		placeholder ??
		formatPhoneGrouped(
			PLACEHOLDER_DIGITS.slice(0, _country.digits),
			_country.groups,
		);

	function parsePhone(displayValue: string): string {
		const _digits = displayValue.replace(/\D/g, "").slice(0, _country.digits);
		return _country.prefix + _digits;
	}

	function formatPhone(rawValueFromContext: string): string {
		const { digits } = stripKnownPrefix(rawValueFromContext);
		return formatPhoneGrouped(digits, _country.groups);
	}

	function phoneValidation(value: string): string | undefined {
		if (value.length === 0) return undefined;
		const { digits } = stripKnownPrefix(value);
		const _onlyDigits = digits.replace(/\D/g, "");
		if (_onlyDigits.length !== _country.digits) {
			return t("phone.errorDigitsRequired", {
				digits: _country.digits,
				prefix: _country.prefix,
			});
		}
		return undefined;
	}

	useEffect(() => {
		const _raw = values[label];
		if (typeof _raw !== "string") return;
		const { prefix: _storedPrefix, digits } = stripKnownPrefix(_raw);
		if (_storedPrefix === undefined || _storedPrefix === _country.prefix) {
			return;
		}
		setValues[label](_country.prefix + digits);
		// biome-ignore lint/correctness/useExhaustiveDependencies: ne sync que sur changement de pays
	}, [_country]);

	useEffect(() => {
		const _raw = values[label];
		const _value = typeof _raw === "string" ? _raw : "";
		setErrors[label](phoneValidation(_value) ?? setError?.(_value));
		// biome-ignore lint/correctness/useExhaustiveDependencies: re-validate uniquement sur changement de pays
	}, [_country]);

	const _maxLength = _country.digits + Math.max(0, _country.groups.length - 1);

	return (
		<InputText
			{...props}
			label={label}
			placeholder={_placeholder}
			keyboardType={"phone-pad"}
			autoCapitalize={"none"}
			autoCorrect={false}
			isSecret={isSecret}
			maxLength={_maxLength}
			leftComponent={
				<Btn.menu
					text={_country.prefix}
					buttonVariant={"ghost"}
					paddingHorizontal={EnumGap.null}
					paddingVertical={EnumGap.null}
				>
					{COUNTRY_CODES.map((_c) => (
						<Btn.basic
							key={_c.prefix}
							text={`${t(_c.labelKey)} (${_c.prefix})`}
							onPress={() => _setCountry(_c)}
							minWidth={100}
						/>
					))}
				</Btn.menu>
			}
			rightComponent={<Icon as={PhoneIcon} />}
			formatValue={formatPhone}
			parseValue={parsePhone}
			setError={(value) => phoneValidation(value) ?? setError?.(value)}
		/>
	);
}
