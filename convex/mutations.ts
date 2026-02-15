// Convex mutations - using mock data for now
// TODO: Connect to real Convex backend when ready

export const updateTaskStatus = async (args: any) => ({
  success: true,
  data: args,
});

export const createTask = async (args: any) => ({
  success: true,
  id: Math.random().toString(36).substr(2, 9),
  data: args,
});

export const addChatMessage = async (args: any) => ({
  success: true,
  timestamp: Date.now(),
});

export const createCalendarEvent = async (args: any) => ({
  success: true,
  id: Math.random().toString(36).substr(2, 9),
});

export const updateCalendarEvent = async (args: any) => ({
  success: true,
});

export const deleteCalendarEvent = async (args: any) => ({
  success: true,
});

export const updateContentDraft = async (args: any) => ({
  success: true,
  updatedAt: Date.now(),
});

export const createContentDraft = async (args: any) => ({
  success: true,
  id: Math.random().toString(36).substr(2, 9),
});

export const addClient = async (args: any) => ({
  success: true,
  id: Math.random().toString(36).substr(2, 9),
});

export const updateClient = async (args: any) => ({
  success: true,
});

export const addActivity = async (args: any) => ({
  success: true,
  timestamp: Date.now(),
});
