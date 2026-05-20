import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	DefaultTheme,
	NavigationContainer,
	type Theme,
} from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import {
	BellIcon,
	ChatCircleDotsIcon,
	CursorClickIcon,
	HouseIcon,
	RowsIcon,
	SpinnerIcon,
	TagIcon,
	TextboxIcon,
} from "phosphor-react-native";
import { Icon } from "../libs/basics/icon";
import { PageAccordeon } from "../pages/accordeon";
import { PageButton } from "../pages/button";
import { PageDialog } from "../pages/dialog";
import { PageHome } from "../pages/home";
import { PageInputs } from "../pages/inputs";
import { PageLoader } from "../pages/loader";
import { PageSecrette } from "../pages/secrette";
import { PageTag } from "../pages/tag";
import { PageToast } from "../pages/toast";
import type { TypeTheme } from "../themes/enum/typeTheme";

const Tabs = createBottomTabNavigator();

export default function Router() {
	const _restyleTheme = useTheme<TypeTheme>();

	const _navTheme: Theme = {
		...DefaultTheme,
		colors: {
			primary: _restyleTheme.colors.primary, // Couleur d'accent : texte des back buttons, icône/label de  l'onglet actif, contrôles focus
			background: _restyleTheme.colors.background, // Fond des écrans (la sceneContainerStyle derrière les pages)
			card: "transparent", // Fond des "cards" : header, tab bar, drawer
			text: _restyleTheme.colors.text, //Texte sur les cards (titres du header, labels de la tab bar)
			border: _restyleTheme.colors.background, //Bordures (séparateur fin sous le header, au-dessus de la tab
			notification: _restyleTheme.colors.red, //couleur des badges (la pastille rouge "3 messages")
		},
	};

	return (
		<NavigationContainer theme={_navTheme}>
			<Tabs.Navigator
				initialRouteName="Accordeon"
				screenOptions={{
					headerShown: false,
					tabBarStyle: {
						backgroundColor: "transparent",
						borderTopWidth: 1,
						// borderColor: EnumColors.red.a,
					},
				}}
			>
				<Tabs.Screen
					name="Home"
					component={PageHome}
					options={{
						tabBarShowLabel: false,
						tabBarIcon: ({ color, focused }) => (
							<Icon
								as={HouseIcon}
								width={24}
								weight={focused ? "fill" : "regular"}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="Inputs"
					component={PageInputs}
					options={{
						tabBarShowLabel: false,
						tabBarIcon: ({ color, focused }) => (
							<Icon
								as={TextboxIcon}
								width={24}
								weight={focused ? "fill" : "regular"}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="Dialog"
					component={PageDialog}
					options={{
						tabBarShowLabel: false,
						tabBarIcon: ({ color, focused }) => (
							<Icon
								as={ChatCircleDotsIcon}
								width={24}
								weight={focused ? "fill" : "regular"}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="Button"
					component={PageButton}
					options={{
						tabBarShowLabel: false,
						tabBarIcon: ({ color, focused }) => (
							<Icon
								as={CursorClickIcon}
								width={24}
								weight={focused ? "fill" : "regular"}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="Tag"
					component={PageTag}
					options={{
						tabBarShowLabel: false,
						tabBarIcon: ({ color, focused }) => (
							<Icon
								as={TagIcon}
								width={24}
								weight={focused ? "fill" : "regular"}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="Loader"
					component={PageLoader}
					options={{
						tabBarShowLabel: false,
						tabBarIcon: ({ color, focused }) => (
							<Icon
								as={SpinnerIcon}
								width={24}
								weight={focused ? "fill" : "regular"}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="Toast"
					component={PageToast}
					options={{
						tabBarShowLabel: false,
						tabBarIcon: ({ color, focused }) => (
							<Icon
								as={BellIcon}
								width={24}
								weight={focused ? "fill" : "regular"}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="Accordeon"
					component={PageAccordeon}
					options={{
						tabBarShowLabel: false,
						tabBarIcon: ({ color, focused }) => (
							<Icon
								as={RowsIcon}
								width={24}
								weight={focused ? "fill" : "regular"}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="Secrette"
					component={PageSecrette}
					options={{
						tabBarButton: () => null, // pas de bouton dans la tab bar
						tabBarItemStyle: { display: "none" }, // ne réserve même pas l'espace
					}}
				/>
			</Tabs.Navigator>
		</NavigationContainer>
	);
}
