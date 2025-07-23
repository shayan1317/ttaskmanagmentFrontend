export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string; // or Date if you're parsing it
};

export type Task = {
  id: number;
  title: string;
  description?: string;
  priority: "Low" | "Medium" | "High";
  status: "To Do" | "In Progress" | "Done";
  due_date: string;
  attachment_url?: string;
  assignee_id: number;
  assignee: {
    id: number;
    name: string;
  };
};

export type LocalStorageValue = {
  user?: User;
  token?: string;
};
// to match front end sttauses with returned backend status
// we would use keys here to map the cols
export const statusMap: Record<string, string> = {
  "To Do": "todo",
  "In Progress": "in_progress",
  Done: "done",
};
