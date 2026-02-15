// Stubs for Convex when in mock/development mode
// Components will call useQuery/useMutation which return null,
// triggering fallback to mock data

export function useQuery(query: any, args?: any): null {
  return null;
}

export function useMutation(mutation: any): (args?: any) => Promise<any> {
  return async (args?: any) => {
    // Simulate async operation
    return new Promise((resolve) => {
      setTimeout(() => resolve(null), 100);
    });
  };
}

export function ConvexProvider({ children }: { children: React.ReactNode }) {
  return children;
}

export function ConvexReactClient(url: string) {
  return {};
}
