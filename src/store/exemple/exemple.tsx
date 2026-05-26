import { api } from "..";
import type { TypeExempleRequest, TypeExempleResponse } from "./type";

const ENDPOINT = "exemple";

const exempleApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getExemple: builder.query<TypeExempleResponse, TypeExempleRequest>({
			query: () => `${ENDPOINT}/`,
			providesTags: ["Exemple"],
		}),
		postExemple: builder.mutation<TypeExempleResponse, TypeExempleRequest>({
			query: () => ({ url: `${ENDPOINT}/`, method: "POST" }),
			invalidatesTags: ["Exemple"],
		}),
		patchExemple: builder.mutation<TypeExempleResponse, TypeExempleRequest>({
			query: () => ({ url: `${ENDPOINT}/`, method: "PATCH" }),
			invalidatesTags: ["Exemple"],
		}),
		deleteExemple: builder.mutation<TypeExempleResponse, TypeExempleRequest>({
			query: () => ({ url: `${ENDPOINT}/`, method: "DELETE" }),
			invalidatesTags: ["Exemple"],
		}),
	}),
});

export const {
	useLazyGetExempleQuery,
	usePostExempleMutation,
	usePatchExempleMutation,
	useDeleteExempleMutation,
} = exempleApi;
