export type MessageContextProps = {
    message: string[];
    showMessage: (type: ShowMessageProps) => void;
};

export type ShowMessageProps = 'created' | 'edited' | 'deleted';

export type MessageState = string[];

export type MessageAction =
    | { type: 'created' }
    | { type: 'edited' }
    | { type: 'deleted' }
    | { type: 'clear' };
