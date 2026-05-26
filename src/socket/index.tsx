import AsyncStorage from "@react-native-async-storage/async-storage";
import { io, type Socket } from "socket.io-client";
import i18n from "../libs/i18n/instance";

const _API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";

export const socket: Socket = io(_API_URL, {
	autoConnect: false,
	auth: async (cb) => {
		const tokenConnection = await AsyncStorage.getItem("tokenConnection");
		cb({
			locale: i18n.language || "fr",
			token: tokenConnection ?? undefined,
		});
	},
});
