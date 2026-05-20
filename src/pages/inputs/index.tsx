import { HouseIcon, MoneyIcon } from "phosphor-react-native";
import { HStack } from "../../libs/basics/hStack";
import { Icon } from "../../libs/basics/icon";
import { Text } from "../../libs/basics/text";
import { EnumTextVariant } from "../../libs/basics/text/props/variant/textVariant";
import { VScroll } from "../../libs/basics/vScroll";
import { VStack } from "../../libs/basics/vStack";
import { Inputs } from "../../libs/design/inputs";
import { EnumInputDateVariant } from "../../libs/design/inputs/inputsDate/variant/enumInputDateVariant";
import { EnumInputSize } from "../../libs/design/inputs/inputsText/size/enumInputSize";
import { useTranslation } from "../../libs/i18n";
import { EnumGap } from "../../themes/spacing";

export function PageInputs() {
	const t = useTranslation("pages/inputs");

	return (
		<Inputs.provider
			initialValues={{
				text1: undefined,
				text2: undefined,
				text3: undefined,
				text4: undefined,
				textarea1: undefined,
				textarea2: undefined,
				textarea3: undefined,
				textarea4: undefined,
				number1: undefined,
				number2: undefined,
				number3: undefined,
				number4: undefined,
				code1: undefined,
				code2: undefined,
				code3: undefined,
				code4: undefined,
				date1: undefined,
				date2: undefined,
				date3: undefined,
				date4: undefined,
				date5: undefined,
				heure1: undefined,
				email1: undefined,
				email2: undefined,
				email3: undefined,
				email4: undefined,
				phone1: undefined,
				phone2: undefined,
				phone3: undefined,
				phone4: undefined,
			}}
		>
			<VStack flex={1} height={"100%"} width={"100%"} padding={EnumGap.s}>
				<VScroll>
					<VStack gap={EnumGap.m}>
						<Text variant={EnumTextVariant.xxl.semibold}>
							{t("sections.text")}
						</Text>
						<Inputs.text
							label="text1"
							placeholder={t("placeholders.hello")}
							size={EnumInputSize.l}
						/>
						<VStack width={200}>
							<Inputs.text
								label="text2"
								title={t("common.title")}
								placeholder={t("placeholders.hello")}
								setError={(value: string) => {
									if (value.length < 3) return t("common.error");
								}}
								rightComponent={<Icon as={HouseIcon} />}
							/>
						</VStack>
						<HStack gap={EnumGap.s}>
							<VStack flex={1}>
								<Inputs.text
									label="text3"
									placeholder={t("placeholders.coucou")}
									helper={t("common.helper")}
								/>
							</VStack>
							<VStack flex={1}>
								<Inputs.text
									label="text4"
									placeholder={t("placeholders.salut")}
								/>
							</VStack>
						</HStack>
					</VStack>
					<VStack gap={EnumGap.m}>
						<Text variant={EnumTextVariant.xxl.semibold}>
							{t("sections.textarea")}
						</Text>
						<Inputs.textarea
							label="textarea1"
							placeholder={t("placeholders.hello")}
							size={EnumInputSize.l}
						/>
						<VStack width={200}>
							<Inputs.textarea
								label="textarea2"
								title={t("common.title")}
								placeholder={t("placeholders.hello")}
								setError={(value: string) => {
									if (value.length < 3) return t("common.error");
								}}
							/>
						</VStack>
						<HStack gap={EnumGap.s}>
							<VStack flex={1}>
								<Inputs.textarea
									label="textarea3"
									placeholder={t("placeholders.coucou")}
									helper={t("common.helper")}
								/>
							</VStack>
							<VStack flex={1}>
								<Inputs.textarea
									label="textarea4"
									placeholder={t("placeholders.salut")}
								/>
							</VStack>
						</HStack>
					</VStack>
					<VStack gap={EnumGap.m}>
						<Text variant={EnumTextVariant.xxl.semibold}>
							{t("sections.number")}
						</Text>
						<Inputs.number
							label="number1"
							placeholder={t("placeholders.ten")}
							size={EnumInputSize.xl}
						/>
						<VStack width={200}>
							<Inputs.number
								label="number2"
								title={t("common.title")}
								placeholder={t("placeholders.ten")}
								setError={(value: number | undefined) => {
									if (!value || value < 3) return t("common.error");
								}}
								rightComponent={<Icon as={MoneyIcon} />}
							/>
						</VStack>
						<HStack gap={EnumGap.s}>
							<VStack flex={1}>
								<Inputs.number
									label="number3"
									placeholder={t("placeholders.coucou")}
									helper={t("common.helperAbove10")}
								/>
							</VStack>
							<VStack flex={1}>
								<Inputs.number
									label="number4"
									placeholder={t("placeholders.coucou")}
									helper={t("common.helperAbove10")}
								/>
							</VStack>
						</HStack>
					</VStack>
					<VStack gap={EnumGap.m}>
						<Text variant={EnumTextVariant.xxl.semibold}>
							{t("sections.code")}
						</Text>
						<Inputs.code nbCaractere={4} label="code1" size={EnumInputSize.l} />

						<VStack width={200}>
							<Inputs.code
								nbCaractere={6}
								label="code2"
								title={t("common.title")}
								setError={(value: number | undefined) => {
									if (!value || value < 3) return t("common.error");
								}}
							/>
						</VStack>
						<HStack gap={EnumGap.s}>
							<VStack flex={1}>
								<Inputs.code
									nbCaractere={4}
									label="code3"
									helper={t("common.helperAbove10")}
								/>
							</VStack>
							<VStack flex={1}>
								<Inputs.code
									nbCaractere={4}
									label="code4"
									helper={t("common.helperAbove10")}
								/>
							</VStack>
						</HStack>
					</VStack>
					<VStack gap={EnumGap.m}>
						<Text variant={EnumTextVariant.xxl.semibold}>
							{t("sections.date")}
						</Text>
						<Inputs.date label="date1" size={EnumInputSize.l} />
						<Inputs.date
							label="date5"
							size={EnumInputSize.l}
							variant={EnumInputDateVariant.dateEtHeure}
						/>

						<VStack width={300} height={100}>
							<Inputs.date
								label="date2"
								title={t("common.title")}
								setError={(value: Date | undefined) => {
									if (!value || value < new Date()) return t("common.error");
								}}
							/>
						</VStack>
						<HStack gap={EnumGap.s}>
							<VStack flex={1}>
								<Inputs.date label="date3" helper={t("common.helperAbove10")} />
							</VStack>
							<VStack flex={1}>
								<Inputs.date label="date4" helper={t("common.helperAbove10")} />
							</VStack>
						</HStack>
						<Inputs.heure label="heure1" size={EnumInputSize.l} />
					</VStack>
					<VStack gap={EnumGap.m}>
						<Text variant={EnumTextVariant.xxl.semibold}>
							{t("sections.email")}
						</Text>
						<Inputs.email label="email1" size={EnumInputSize.l} />
						<VStack width={200}>
							<Inputs.email
								label="email2"
								title={t("common.title")}
								setError={(value: string | undefined) => {
									if (!value || value.length < 10) return t("common.error");
								}}
							/>
						</VStack>
						<HStack gap={EnumGap.s}>
							<VStack flex={1}>
								<Inputs.email
									label="email3"
									helper={t("common.helperAbove10")}
								/>
							</VStack>
							<VStack flex={1}>
								<Inputs.email
									label="email4"
									helper={t("common.helperAbove10")}
								/>
							</VStack>
						</HStack>
					</VStack>
					<VStack gap={EnumGap.m}>
						<Text variant={EnumTextVariant.xxl.semibold}>
							{t("sections.phone")}
						</Text>
						<Inputs.phone label="phone1" size={EnumInputSize.l} />
						<VStack width={200}>
							<Inputs.phone label="phone2" title={t("common.title")} />
						</VStack>
						<HStack gap={EnumGap.s}>
							<VStack flex={1}>
								<Inputs.phone
									label="phone3"
									helper={t("common.helperAbove10")}
								/>
							</VStack>
							<VStack flex={1}>
								<Inputs.phone
									label="phone4"
									helper={t("common.helperAbove10")}
								/>
							</VStack>
						</HStack>
					</VStack>
				</VScroll>
			</VStack>
		</Inputs.provider>
	);
}
