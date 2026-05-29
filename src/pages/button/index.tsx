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
					variant={"solid"}
					onPress={() => {
						getExemple({});
					}}
				/>
				<Btn.basic
					flex={1}
					text={t("post")}
					variant={"solid"}
					onPress={() => {
						getPost({});
					}}
				/>
				<Btn.basic
					flex={1}
					text={t("patch")}
					variant={"solid"}
					onPress={() => {
						getPatch({});
					}}
				/>
				<Btn.basic
					flex={1}
					text={t("delete")}
					variant={"solid"}
					onPress={() => {
						getDelete({});
					}}
				/>
				<Btn.basic
					flex={1}
					text={t("socket")}
					variant={"solid"}
					onPress={() => {
						socket.emit("ping", {});
					}}
				/>
				<HScroll gap={EnumGap.s} padding={EnumGap.s}>
					<Btn.basic flex={1} text={t("basic")} variant={"solid"} />
					<Btn.basic
						flex={1}
						text={t("basic")}
						variant={"solid"}
						colorSchema={EnumColors.secondary.default}
					/>
					<Btn.basic
						flex={1}
						text={t("basic")}
						variant={"solid"}
						colorSchema={EnumColors.destructive.default}
					/>
					<Btn.basic
						flex={1}
						text={t("basic")}
						variant={"solid"}
						colorSchema={EnumColors.blue.default}
					/>
				</HScroll>
				<HScroll gap={EnumGap.s} padding={EnumGap.s}>
					<Btn.basic flex={1} text={t("basic")} variant={"outline"} />
					<Btn.basic
						flex={1}
						text={t("basic")}
						variant={"outline"}
						colorSchema={EnumColors.secondary.default}
					/>
					<Btn.basic
						flex={1}
						text={t("basic")}
						variant={"outline"}
						colorSchema={EnumColors.destructive.default}
					/>
					<Btn.basic
						flex={1}
						text={t("basic")}
						variant={"outline"}
						colorSchema={EnumColors.blue.default}
					/>
				</HScroll>
				<HScroll gap={EnumGap.s} padding={EnumGap.s}>
					<Btn.basic flex={1} text={t("basic")} variant={"ghost"} />
					<Btn.basic
						flex={1}
						text={t("basic")}
						variant={"ghost"}
						colorSchema={EnumColors.secondary.default}
					/>
					<Btn.basic
						flex={1}
						text={t("basic")}
						variant={"ghost"}
						colorSchema={EnumColors.destructive.default}
					/>
					<Btn.basic
						flex={1}
						text={t("basic")}
						variant={"ghost"}
						colorSchema={EnumColors.blue.default}
					/>
				</HScroll>
				<HScroll gap={EnumGap.s} padding={EnumGap.s}>
					<Btn.basic
						flex={1}
						text={t("basic")}
						variant={"ghostSelected"}
						isActive={true}
					/>
					<Btn.basic
						flex={1}
						text={t("basic")}
						variant={"ghostSelected"}
						colorSchema={EnumColors.secondary.default}
					/>
					<Btn.basic
						flex={1}
						text={t("basic")}
						variant={"ghostSelected"}
						colorSchema={EnumColors.destructive.default}
					/>
					<Btn.basic
						flex={1}
						text={t("basic")}
						variant={"ghostSelected"}
						colorSchema={EnumColors.blue.default}
					/>
				</HScroll>
				<HScroll gap={EnumGap.s} padding={EnumGap.s}>
					<Btn.basic
						flex={1}
						text={t("basic")}
						variant={"link"}
						isActive={true}
						colorSchema={EnumColors.link.default}
					/>
					<Btn.basic
						flex={1}
						text={t("basic")}
						variant={"link"}
						colorSchema={EnumColors.secondary.default}
					/>
					<Btn.basic
						flex={1}
						text={t("basic")}
						variant={"link"}
						colorSchema={EnumColors.destructive.default}
					/>
					<Btn.basic
						flex={1}
						text={t("basic")}
						variant={"link"}
						colorSchema={EnumColors.blue.default}
					/>
				</HScroll>
				<HStack gap={EnumGap.s}>
					<Btn.basic flex={1} text={t("basic")} variant={"solid"} />
					<Btn.basic flex={1} text={t("basic")} variant={"solid"} />
					<Btn.basic flex={1} iconCenter={HouseIcon} variant={"solid"} />
				</HStack>
				<HScroll gap={EnumGap.s} padding={EnumGap.s}>
					<VStack height={200} width={200}>
						<Btn.basic
							text={t("long")}
							iconLeft={HouseIcon}
							iconRight={HouseIcon}
							variant={"solid"}
						/>
					</VStack>
					<VStack height={100} width={200}>
						<Btn.basic
							text={t("long")}
							iconLeft={HouseIcon}
							iconRight={HouseIcon}
							variant={"solid"}
						/>
					</VStack>
					<VStack height={100} width={200}>
						<Btn.basic
							text={t("basic")}
							variant={"solid"}
							iconLeft={HouseIcon}
							iconRight={HouseIcon}
						/>
					</VStack>
					<VStack height={50} width={200}>
						<Btn.basic text={t("long")} variant={"solid"} />
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
					<Btn.basic text={t("long")} variant={"solid"} />
				</VStack>
				<Btn.basic text={t("long")} variant={"solid"} />
				<Btn.basic text={t("basic")} variant={"solid"} />

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
