import { useTheme } from "@shopify/restyle";
import { useEffect, useRef, useState } from "react";
import {
	type NativeSyntheticEvent,
	Pressable,
	TextInput,
	type TextInputKeyPressEventData,
} from "react-native";
import { EnumColors } from "../../../../themes/colors/enum/enumColors";
import type { TypeTheme } from "../../../../themes/enum/typeTheme";
import { EnumRadius } from "../../../../themes/radius";
import { EnumGap } from "../../../../themes/spacing";
import { HStack } from "../../../basics/hStack";
import { Text } from "../../../basics/text";
import { VStack } from "../../../basics/vStack";
import { useContextInputs } from "../contextInput/hooks/useContextInputs";
import {
	EnumInputSize,
	inputSizeStyles,
} from "../inputsText/size/enumInputSize";
import { KEYBOARD_ACCESSORY_ID } from "../keyboardAccessory";

type TypeInputCodeProps = {
	label: string;
	title?: string;
	helper?: string;
	setError?: (value: number | undefined) => string | undefined;
	size?: EnumInputSize;
	nbCaractere: number;
	autoFocus?: boolean;
	isSecret?: boolean;
};

export function InputCode({
	label,
	title,
	helper,
	setError,
	size = EnumInputSize.l,
	nbCaractere,
	autoFocus = false,
	isSecret = false,
}: TypeInputCodeProps) {
	const { values, setValues, errors, setErrors } = useContextInputs();
	const [_isTouched, _setIsTouched] = useState(false);
	const _theme = useTheme<TypeTheme>();
	const _textColor = _theme.colors.text;
	const _grayColor = _theme.colors["gray.f"];
	const _sizeStyle = inputSizeStyles[size];

	const _rawValue = values[label];
	const _contextNumber = typeof _rawValue === "number" ? _rawValue : undefined;

	const [_digits, _setDigits] = useState<string[]>(() => {
		if (_contextNumber === undefined) return Array(nbCaractere).fill("");
		return String(_contextNumber)
			.padStart(nbCaractere, "0")
			.slice(-nbCaractere)
			.split("");
	});

	const _refs = useRef<Array<TextInput | null>>([]);
	const _errorMessage = _isTouched ? errors[label] : undefined;

	useEffect(() => {
		if (setError !== undefined) {
			setErrors[label](setError(_contextNumber));
		}
	}, [_contextNumber, setError, label, setErrors]);

	function commitDigits(nextDigits: string[]) {
		_setDigits(nextDigits);
		const _joined = nextDigits.join("");
		if (_joined === "") {
			setValues[label](undefined);
			return;
		}
		const _parsed = Number.parseInt(_joined, 10);
		if (!Number.isNaN(_parsed)) {
			setValues[label](_parsed);
		}
	}

	function handleChangeText(index: number, text: string) {
		if (!_isTouched) _setIsTouched(true);
		const _digit = text.replace(/\D/g, "").slice(-1);
		const _next = [..._digits];
		_next[index] = _digit;
		commitDigits(_next);

		if (_digit !== "" && index < nbCaractere - 1) {
			_refs.current[index + 1]?.focus();
		}
	}

	function handleKeyPress(
		index: number,
		e: NativeSyntheticEvent<TextInputKeyPressEventData>,
	) {
		if (e.nativeEvent.key !== "Backspace") return;
		if (_digits[index] !== "") return;
		if (index === 0) return;

		const _next = [..._digits];
		_next[index - 1] = "";
		commitDigits(_next);
		_refs.current[index - 1]?.focus();
	}

	return (
		<VStack gap={EnumGap.xs} flex={1}>
			{title !== undefined && (
				<Text variant={_sizeStyle.titleVariant} color={EnumColors.text}>
					{title}
				</Text>
			)}
			<Pressable onPress={() => _refs.current[0]?.focus()}>
				<HStack gap={EnumGap.s}>
					{Array.from({ length: nbCaractere }).map((_, _index) => (
						<HStack
							// biome-ignore lint/suspicious/noArrayIndexKey: cells are positional, count is stable
							key={_index}
							alignItems={"center"}
							justifyContent={"center"}
							borderWidth={1}
							borderStyle={"solid"}
							borderColor={EnumColors.gray.f}
							borderRadius={EnumRadius.s}
							paddingHorizontal={_sizeStyle.paddingHorizontal}
							paddingVertical={_sizeStyle.paddingVertical}
						>
							<TextInput
								ref={(r) => {
									_refs.current[_index] = r;
								}}
								value={_digits[_index]}
								onChangeText={(text) => handleChangeText(_index, text)}
								onKeyPress={(e) => handleKeyPress(_index, e)}
								placeholderTextColor={_grayColor}
								keyboardType={"number-pad"}
								inputAccessoryViewID={KEYBOARD_ACCESSORY_ID}
								secureTextEntry={isSecret}
								autoFocus={_index === 0 && autoFocus}
								maxLength={1}
								textAlign={"center"}
								style={{
									minWidth: _sizeStyle.fontSize,
									height: _sizeStyle.fontSize * 1.2,
									padding: 0,
									color: _textColor,
									fontSize: _sizeStyle.fontSize,
								}}
							/>
						</HStack>
					))}
				</HStack>
			</Pressable>
			{_errorMessage !== undefined ? (
				<Text
					variant={_sizeStyle.helperVariant}
					color={EnumColors.red.a}
					fontStyle={"italic"}
				>
					{_errorMessage}
				</Text>
			) : helper !== undefined ? (
				<Text
					variant={_sizeStyle.helperVariant}
					color={EnumColors.gray.a}
					fontStyle={"italic"}
				>
					{helper}
				</Text>
			) : null}
		</VStack>
	);
}
