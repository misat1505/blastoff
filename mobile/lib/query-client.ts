import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.error("[QUERY ERROR]", {
        error,
        queryKey: query.queryKey,
        meta: query.meta,
      });
    },
  }),

  mutationCache: new MutationCache({
    onError: (error, variables, context, mutation) => {
      console.error("[MUTATION ERROR]", {
        error,
        mutationKey: mutation.options.mutationKey,
        variables,
        meta: mutation.meta,
      });
    },
  }),

  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
