export interface Task {
    id: string;
    title: string;
    notes: string;
    listId: string | null;
    completed: boolean;
    important: boolean;
}