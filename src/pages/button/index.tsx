import { HouseIcon } from "phosphor-react-native";
import { HScroll } from "../../libs/basics/hScroll";
import { HStack } from "../../libs/basics/hStack";
import { VScroll } from "../../libs/basics/vScroll";
import { VStack } from "../../libs/basics/vStack";
import { Btn } from "../../libs/design/buttons";
import { useTranslation } from "../../libs/i18n";
import { socket } from "../../socket";
import {
	useDeleteExempleMutation,
	useLazyGetExempleQuery,
	usePatchExempleMutation,
	usePostExempleMutation,
} from "../../store/exemple/exemple";
import { EnumColors } from "../../themes/colors/enum/enumColors";
import { EnumGap } from "../../themes/spacing";

export function PageButton() {
	const t = useTranslation("pages/button");
	const [getExemple] = useLazyGetExempleQuery();
	const [getPost] = usePostExempleMutation();
	const [getPatch] = usePatchExempleMutation();
	const [getDelete] = useDeleteExempleMutation();

	return (
		<VStack
			flex={1}
			height={"100%"}
			width={"100%"}
			gap={EnumGap.l}
			padding={EnumGap.m}
		>
			<VScroll gap={EnumGap.s}>
				<Btn.basic
					flex={1}
					text={t("get")}
					buttonVariant={"solid"}
					onPress={() => {
						getExemple({});
					}}
				/>
				<Btn.basic
					flex={1}
					text={t("post")}
					buttonVariant={"solid"}
					onPress={() => {
						getPost({});
					}}
				/>
				<Btn.basic
					flex={1}
					text={t("patch")}
					buttonVariant={"solid"}
					onPress={() => {
						getPatch({});
					}}
				/>
				<Btn.basic
					flex={1}
					text={t("delete")}
					buttonVariant={"solid"}
					onPress={() => {
						getDelete({});
					}}
				/>
				<Btn.basic
					flex={1}
					text={t("socket")}
					buttonVariant={"solid"}
					onPress={() => {
						socket.emit("ping", {});
					}}
				/>
				<HScroll gap={EnumGap.s} padding={EnumGap.s}>
					<Btn.basic flex={1} text={t("basic")} buttonVariant={"solid"} />
					<Btn.basic
						flex={1}
						text={t("basic")}
						buttonVariant={"solid"}
						colorSchema={EnumColors.secondary.default}
					/>
					<Btn.basic
						flex={1}
						text={t("basic")}
						buttonVariant={"solid"}
						colorSchema={EnumColors.destructive.default}
					/>
					<Btn.basic
						flex={1}
						text={t("basic")}
						buttonVariant={"solid"}
						colorSchema={EnumColors.blue.default}
					/>
				</HScroll>
				<HScroll gap={EnumGap.s} padding={EnumGap.s}>
					<Btn.basic flex={1} text={t("basic")} buttonVariant={"outline"} />
					<Btn.basic
						flex={1}
						text={t("basic")}
						buttonVariant={"outline"}
						colorSchema={EnumColors.secondary.default}
					/>
					<Btn.basic
						flex={1}
						text={t("basic")}
						buttonVariant={"outline"}
						colorSchema={EnumColors.destructive.default}
					/>
					<Btn.basic
						flex={1}
						text={t("basic")}
						buttonVariant={"outline"}
						colorSchema={EnumColors.blue.default}
					/>
				</HScroll>
				<HScroll gap={EnumGap.s} padding={EnumGap.s}>
					<Btn.basic flex={1} text={t("basic")} buttonVariant={"ghost"} />
					<Btn.basic
						flex={1}
						text={t("basic")}
						buttonVariant={"ghost"}
						colorSchema={EnumColors.secondary.default}
					/>
					<Btn.basic
						flex={1}
						text={t("basic")}
						buttonVariant={"ghost"}
						colorSchema={EnumColors.destructive.default}
					/>
					<Btn.basic
						flex={1}
						text={t("basic")}
						buttonVariant={"ghost"}
						colorSchema={EnumColors.blue.default}
					/>
				</HScroll>
				<HScroll gap={EnumGap.s} padding={EnumGap.s}>
					<Btn.basic
						flex={1}
						text={t("basic")}
						buttonVariant={"ghostSelected"}
						isActive={true}
					/>
					<Btn.basic
						flex={1}
						text={t("basic")}
						buttonVariant={"ghostSelected"}
						colorSchema={EnumColors.secondary.default}
					/>
					<Btn.basic
						flex={1}
						text={t("basic")}
						buttonVariant={"ghostSelected"}
						colorSchema={EnumColors.destructive.default}
					/>
					<Btn.basic
						flex={1}
						text={t("basic")}
						buttonVariant={"ghostSelected"}
						colorSchema={EnumColors.blue.default}
					/>
				</HScroll>
				<HScroll gap={EnumGap.s} padding={EnumGap.s}>
					<Btn.basic
						flex={1}
						text={t("basic")}
						buttonVariant={"link"}
						isActive={true}
						colorSchema={EnumColors.link.default}
					/>
					<Btn.basic
						flex={1}
						text={t("basic")}
						buttonVariant={"link"}
						colorSchema={EnumColors.secondary.default}
					/>
					<Btn.basic
						flex={1}
						text={t("basic")}
						buttonVariant={"link"}
						colorSchema={EnumColors.destructive.default}
					/>
					<Btn.basic
						flex={1}
						text={t("basic")}
						buttonVariant={"link"}
						colorSchema={EnumColors.blue.default}
					/>
				</HScroll>
				<HStack gap={EnumGap.s}>
					<Btn.basic flex={1} text={t("basic")} buttonVariant={"solid"} />
					<Btn.basic flex={1} text={t("basic")} buttonVariant={"solid"} />
					<Btn.basic flex={1} iconCenter={HouseIcon} buttonVariant={"solid"} />
				</HStack>
				<HScroll gap={EnumGap.s} padding={EnumGap.s}>
					<VStack height={200} width={200}>
						<Btn.basic
							text={t("long")}
							iconLeft={HouseIcon}
							iconRight={HouseIcon}
							buttonVariant={"solid"}
						/>
					</VStack>
					<VStack height={100} width={200}>
						<Btn.basic
							text={t("long")}
							iconLeft={HouseIcon}
							iconRight={HouseIcon}
							buttonVariant={"solid"}
						/>
					</VStack>
					<VStack height={100} width={200}>
						<Btn.basic
							text={t("basic")}
							buttonVariant={"solid"}
							iconLeft={HouseIcon}
							iconRight={HouseIcon}
						/>
					</VStack>
					<VStack height={50} width={200}>
						<Btn.basic text={t("long")} buttonVariant={"solid"} />
					</VStack>
				</HScroll>
				<Btn.menu text={t("options")}>
					<Btn.basic text={t("menuItem")} />
					<Btn.basic text={t("menuItem")} />
					<Btn.basic text={t("menuItem")} />
					<Btn.basic text={t("menuItem")} />
					<Btn.basic text={t("menuItem")} />
					<Btn.basic text={t("menuItem")} />
					<Btn.basic text={t("menuItem")} />
					<Btn.basic text={t("menuItem")} />
				</Btn.menu>
				<VStack width={100} height={100}>
					<Btn.basic text={t("long")} buttonVariant={"solid"} />
				</VStack>
				<Btn.basic text={t("long")} buttonVariant={"solid"} />
				<Btn.basic text={t("basic")} buttonVariant={"solid"} />

				<Btn.menu text={t("options")} width={200}>
					<Btn.basic text={t("menuItem")} />
					<Btn.basic text={t("menuItem")} />
					<Btn.basic text={t("menuItem")} />
					<Btn.basic text={t("menuItem")} />
					<Btn.basic text={t("menuItem")} />
					<Btn.basic text={t("menuItem")} />
					<Btn.basic text={t("menuItem")} />
					<Btn.basic text={t("menuItem")} />
					<Btn.basic text={t("menuItem")} />
					<Btn.basic text={t("menuItem")} />
					<Btn.basic text={t("menuItem")} />
					<Btn.basic text={t("menuItem")} />
					<Btn.basic text={t("menuItem")} />
					<Btn.basic text={t("menuItem")} />
				</Btn.menu>
			</VScroll>
		</VStack>
	);
}
