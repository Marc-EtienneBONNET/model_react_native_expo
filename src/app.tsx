import { ThemeProvider } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import {
	SafeAreaProvider,
	useSafeAreaInsets,
} from "react-native-safe-area-context";

import { VStack } from "./libs/basics/vStack";
import { KeyboardAccessory } from "./libs/design/inputs/keyboardAccessory";
import { Toast } from "./libs/design/toast";
import { ContextToastProvider } from "./libs/design/toast/contextToast";
import { useContextToast } from "./libs/design/toast/contextToast/hooks/useContextToast";
import Router from "./routers";
import { EnumColors } from "./themes/colors/enum/enumColors";
import { darkTheme } from "./themes/darkTheme";
import { lightTheme } from "./themes/lightTheme";
import { EnumGap } from "./themes/spacing";

export default function App() {
	const colorScheme = useColorScheme();
	const _activeTheme = colorScheme === "dark" ? darkTheme : lightTheme;

	return (
		<SafeAreaProvider>
			<ThemeProvider theme={_activeTheme}>
				<ContextToastProvider>
					<StatusBar style="auto" />
					<AppContent />
				</ContextToastProvider>
			</ThemeProvider>
		</SafeAreaProvider>
	);
}

function AppContent() {
	const insets = useSafeAreaInsets();
	const { toast, newToast } = useContextToast();

	return (
		<VStack
			flex={1}
			backgroundColor={EnumColors.background}
			position="relative"
		>
			<Toast
				isOpen={!!toast}
				onClose={() => newToast(undefined)}
				title={toast ? toast?.title : ""}
				subtitle={toast?.subtitle}
				duration={toast?.duration}
				toastVariant={toast?.toastVariant}
				colorSchema={toast?.colorSchema}
			/>
			<VStack
				style={{ height: insets.top, width: "100%" }}
				backgroundColor={EnumColors.background}
				zIndex={1}
				shadowBottom
			/>
			<VStack flex={1} overflow={"hidden"} zIndex={0} paddingTop={EnumGap.s}>
				<Router />
			</VStack>
			<KeyboardAccessory />
		</VStack>
	);
}
