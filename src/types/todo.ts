import { SaluteCommand } from '@salutejs/scenario';
import { createAssistant, createSmartappDebugger } from '@salutejs/client';

import { InputActionType } from '../scenario/types';

export type Action = {
    type: string;
    payload: Record<string, unknown> | unknown[];
};

export interface Note {
    id: string;
    title: string;
    completed: boolean;
}

export interface AddNoteCommand extends SaluteCommand {
    type: 'add_note';
    payload: {
        note: string;
    };
}

export interface DoneNoteCommand extends SaluteCommand {
    type: 'done';
    payload: {
        note: string;
    };
}

export interface DeleteNoteCommand extends SaluteCommand {
    type: 'delete_note';
    payload: {
        id: string;
    };
}
export interface GetInitialNotesCommand extends SaluteCommand {
    type: 'notes';
}

export type OutputActionType = AddNoteCommand | DoneNoteCommand | DeleteNoteCommand | GetInitialNotesCommand;

export type Assistant = (ReturnType<typeof createAssistant> | ReturnType<typeof createSmartappDebugger>) & {
    sendActionPromisified?: (actionToSend: OutputActionType) => Promise<InputActionType['payload']>;
};
