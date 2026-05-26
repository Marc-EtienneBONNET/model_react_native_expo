import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import i18n from "../libs/i18n/instance";

const _API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";

const _baseQuery = fetchBaseQuery({
	baseUrl: _API_URL,
	prepareHeaders: async (headers) => {
		headers.set("Accept-Language", i18n.language || "fr");
		const tokenConnection = await AsyncStorage.getItem("tokenConnection");
		if (tokenConnection) {
			headers.set("Authorization", `Bearer ${tokenConnection}`);
		}
		return headers;
	},
});

export const api = createApi({
	reducerPath: "api",
	baseQuery: _baseQuery,
	endpoints: () => ({}),
	tagTypes: ["Exemple"],
});

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export type TypeRootState = ReturnType<typeof store.getState>;
export type TypeAppDispatch = typeof store.dispatch;
