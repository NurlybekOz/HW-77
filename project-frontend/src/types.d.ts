export interface MessageMutation {
    author: string;
    message: string;
    image: string | null;
}
export interface IMessages {
    id: string;
    author: string;
    message: string;
    image: file | null;
}