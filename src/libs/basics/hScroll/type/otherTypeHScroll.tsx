import { createBox } from "@shopify/restyle";
import type { ComponentProps } from "react";
import { ScrollView } from "react-native";
import type { TypeTheme } from "../../../../themes/enum/typeTheme";

export const RestyleHScroll = createBox<
	TypeTheme,
	ComponentProps<typeof ScrollView>
>(ScrollView);
