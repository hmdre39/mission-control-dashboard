// Stub for Convex server - using mock data instead
export const mutation = (config: any) => {
  if (typeof config === "function") {
    return config;
  }
  return config?.handler || (() => ({}));
};

export const query = (config: any) => {
  if (typeof config === "function") {
    return config;
  }
  return config?.handler || (() => ({}));
};

export const action = (config: any) => {
  if (typeof config === "function") {
    return config;
  }
  return config?.handler || (() => ({}));
};
