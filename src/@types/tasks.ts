export type TasksProps = Array<{
    id: string;
    content: string;
    status: string;
}>;

export type HomeTasksProps = Array<{
    id: string;
    uid: string;
    content: string;
    status: string;
}>;

export type TaskProps = {
    id: string;
    content: string;
    status: string;
};
