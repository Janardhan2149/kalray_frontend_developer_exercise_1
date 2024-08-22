export interface Task {
    id: number;
    content: string;
    done: boolean;
    done_time: string | null;
}