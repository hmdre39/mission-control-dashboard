// Convex queries - using mock data for now
// TODO: Connect to real Convex backend when ready

export const getSystemStatus = async () => ({
  status: "healthy",
  uptime: Date.now(),
});

export const getAgents = async () => [];

export const getAgent = async (args: any) => null;

export const getCronJobs = async () => [];

export const getTasks = async (args: any) => [];

export const getContentDrafts = async (args: any) => [];

export const getCalendarEvents = async (args: any) => [];

export const getChatSessions = async () => [];

export const getChatMessages = async (args: any) => [];

export const getClients = async (args: any) => [];

export const getEcosystemProduct = async (args: any) => null;

export const getEcosystemProducts = async () => [];

export const getActivities = async (args: any) => [];
