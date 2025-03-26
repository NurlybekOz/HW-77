export interface MessageWithoutId {
    author: string;
    message: string;
    image: string | null;
}
export interface MessageUser {
    id: string;
    author: string;
    message: string;
    image: string | null;
}