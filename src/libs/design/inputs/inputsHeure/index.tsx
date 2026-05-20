import { ClockIcon } from "phosphor-react-native";
import { type ReactNode, useEffect, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { EnumColors } from "../../../../themes/colors/enum/enumColors";
import { EnumRadius } from "../../../../themes/radius";
import { EnumGap } from "../../../../themes/spacing";
import { Box } from "../../../basics/box";
import { HStack } from "../../../basics/hStack";
import { Icon } from "../../../basics/icon";
import { Text } from "../../../basics/text";
import { TouchableOpacity } from "../../../basics/touchableOpacity";
import { VStack } from "../../../basics/vStack";
import { useTranslation } from "../../../i18n";
import { useContextInputs } from "../contextInput/hooks/useContextInputs";
import type { TypeHeure } from "../contextInput/types/typeHeure";
import {
	EnumInputSize,
	inputSizeStyles,
} from "../inputsText/size/enumInputSize";

type TypeInputHeureProps = {
	label: string;
	title?: string;
	helper?: string;
	setError?: (value: TypeHeure | undefined) => string | undefined;
	size?: EnumInputSize;
	placeholder?: string;
	autoFocus?: boolean;
	rightComponent?: ReactNode;
	isSecret?: boolean;
};

function isTypeHeure(value: unknown): value is TypeHeure {
	if (typeof value !== "object" || value === null) return false;
	if (value instanceof Date) return false;
	return (
		"hours" in value &&
		"minutes" in value &&
		typeof (value as TypeHeure).hours === "number" &&
		typeof (value as TypeHeure).minutes === "number"
	);
}

function formatHeure(value: TypeHeure): string {
	const _h = String(value.hours).padStart(2, "0");
	const _m = String(value.minutes).padStart(2, "0");
	return `${_h}:${_m}`;
}

function toDate(value: TypeHeure | undefined): Date {
	const _d = new Date();
	if (value !== undefined) {
		_d.setHours(value.hours, value.minutes, 0, 0);
	}
	return _d;
}

export function InputHeure({
	label,
	title,
	helper,
	setError,
	size = EnumInputSize.m,
	placeholder,
	autoFocus = false,
	rightComponent = <Icon as={ClockIcon} />,
	isSecret = false,
}: TypeInputHeureProps) {
	const t = useTranslation("libs/inputs");
	const { values, setValues, errors, setErrors } = useContextInputs();
	const [_isTouched, _setIsTouched] = useState(false);
	const [_isOpen, _setIsOpen] = useState<boolean>(autoFocus);
	const _sizeStyle = inputSizeStyles[size];

	const _rawValue = values[label];
	const _contextHeure: TypeHeure | undefined = isTypeHeure(_rawValue)
		? _rawValue
		: undefined;
	const _errorMessage = _isTouched ? errors[label] : undefined;
	const _formattedHeure =
		_contextHeure !== undefined ? formatHeure(_contextHeure) : "";
	const _displayValue = isSecret
		? "•".repeat(_formattedHeure.length)
		: _formattedHeure;

	useEffect(() => {
		if (setError !== undefined) {
			setErrors[label](setError(_contextHeure));
		}
	}, [_contextHeure, setError, label, setErrors]);

	function handleConfirm(date: Date) {
		if (!_isTouched) _setIsTouched(true);
		setValues[label]({
			hours: date.getHours(),
			minutes: date.getMinutes(),
		});
		_setIsOpen(false);
	}

	function handleCancel() {
		_setIsOpen(false);
	}

	return (
		<VStack gap={EnumGap.xs} flex={1}>
			{title !== undefined && (
				<Text variant={_sizeStyle.titleVariant} color={EnumColors.text}>
					{title}
				</Text>
			)}
			<TouchableOpacity activeOpacity={0.7} onPress={() => _setIsOpen(true)}>
				<HStack
					alignItems={"center"}
					gap={EnumGap.s}
					borderWidth={1}
					borderStyle={"solid"}
					borderColor={EnumColors.gray.f}
					borderRadius={EnumRadius.s}
					padding={_sizeStyle.paddingHorizontal}
					paddingVertical={_sizeStyle.paddingVertical}
					overflow={"hidden"}
				>
					<VStack flex={1}>
						<Text
							color={_displayValue === "" ? EnumColors.gray.f : EnumColors.text}
							style={{ fontSize: _sizeStyle.fontSize }}
						>
							{_displayValue !== ""
								? _displayValue
								: (placeholder ?? t("heure.placeholder"))}
						</Text>
					</VStack>
					{rightComponent !== undefined && (
						<>
							<Box
								alignSelf={"stretch"}
								width={1}
								backgroundColor={EnumColors.gray.f}
							/>
							<Box>{rightComponent}</Box>
						</>
					)}
				</HStack>
			</TouchableOpacity>
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

			<DateTimePickerModal
				isVisible={_isOpen}
				mode={"time"}
				display={"spinner"}
				is24Hour={true}
				locale={"fr-FR"}
				date={toDate(_contextHeure)}
				onConfirm={handleConfirm}
				onCancel={handleCancel}
			/>
		</VStack>
	);
}
