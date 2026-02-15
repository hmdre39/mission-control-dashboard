// Convex stubs for local development
// This prevents import errors when Convex isn't initialized

export function useQuery(query: any, args?: any) {
  return null;
}

export function useMutation(mutation: any) {
  return async () => {};
}

export function ConvexProvider({ children }: any) {
  return children;
}

export function ConvexReactClient(url: string) {
  return {};
}
