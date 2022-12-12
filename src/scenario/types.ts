/* eslint-disable @typescript-eslint/ban-ts-comment */
import { SaluteRequestVariable } from '@salutejs/scenario';

type SaluteCommand = {
    type: string;
    payload?: Record<string, unknown> | Array<unknown>;
};

export interface Note {
    id: string;
    title: string;
    completed: boolean;
}

export interface InitCommand extends SaluteCommand {
    type: 'init';
    payload: {
        notes: Array<Note>;
    };
}

export interface AddNoteCommand extends SaluteCommand {
    type: 'add_note';
    payload: {
        note: string;
    };
}

export interface DoneNoteCommand extends SaluteCommand {
    type: 'done_note';
    payload: {
        id: string;
    };
}

export interface DeleteNoteCommand extends SaluteCommand {
    type: 'delete_note';
    payload: {
        id: string;
    };
}

export interface SetInitialNotesCommand extends SaluteCommand {
    type: 'set_initial_notes';
    payload: Note[];
}

export type InputActionType = AddNoteCommand | DoneNoteCommand | DeleteNoteCommand | SetInitialNotesCommand;

export interface NoteVariable extends SaluteRequestVariable {
    note: string;
}
