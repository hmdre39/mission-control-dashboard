// Stub for useQuery to avoid Convex dependencies
export function useQuery(query: any, args?: any) {
  // Return null to trigger mock data in components
  return null;
}

export function useMutation(mutation: any) {
  // Return a no-op mutation function
  return async (...args: any[]) => {};
}
