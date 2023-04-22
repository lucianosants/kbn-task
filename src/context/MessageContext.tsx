import { createContext, useReducer } from 'react';

import {
    MessageAction,
    MessageContextProps,
    MessageState,
    ShowMessageProps,
} from '../@types/message-context';
import { OnlyChildren } from '../@types/only-children';

export const MessageContext = createContext<MessageContextProps>({
    message: 'inicial',
    showMessage: () => {},
});

export const MessageContextProvider = ({ children }: OnlyChildren) => {
    const setMessage = (state: MessageState, action: MessageAction) => {
        switch (action.type) {
            case 'created':
                return 'A task was created:';
            case 'edited':
                return 'A task was edited:' + state;
            case 'deleted':
                return 'A task was deleted:' + state;
            case 'clear':
                return '';
            default:
                return 'An error occurred while executing action';
        }
    };

    const [state, dispatch] = useReducer(setMessage, '');

    const showMessage = (type: ShowMessageProps) => {
        switch (type) {
            case 'created':
                dispatch({ type: 'created' });
                break;
            case 'edited':
                dispatch({ type: 'edited' });
                break;
            case 'deleted':
                dispatch({ type: 'deleted' });
                break;
            default:
                return;
        }
        setTimeout(() => dispatch({ type: 'clear' }), 3000);
    };

    return (
        <MessageContext.Provider
            value={{
                message: state,
                showMessage,
            }}
        >
            {children}
        </MessageContext.Provider>
    );
};
