import Router from 'next/router';
import { QueryClient } from 'react-query';

import { InputActionType, SetInitialNotesCommand } from '../scenario/types';
import { GetInitialNotesCommand, Note } from '../types/todo';
import { getBasePathNotInComponent, waitForRouter } from '../utils/utils';

import { useAssistantQuery } from './assistantReactQuery';

export const queryClient = new QueryClient();

export function addNote(note: string) {
    queryClient.setQueryData<Note[]>('notes', (oldNotes = []) => [
        ...oldNotes,
        {
            id: Math.random().toString(36).substring(7),
            title: note,
            completed: false,
        },
    ]);
}

export function markNoteDone(noteId: string) {
    queryClient.setQueryData<Note[]>('notes', (oldNotes = []) => {
        return oldNotes.map((todo) => (todo.id === noteId ? { ...todo, completed: true } : todo));
    });
}

function deleteNote(noteId: string) {
    queryClient.setQueryData<Note[]>('notes', (oldNotes = []) => oldNotes.filter(({ id }) => id !== noteId));
}

function setNotes(notes: Note[]) {
    queryClient.setQueryData<Note[]>('notes', () => notes, { updatedAt: Date.now() + 2000 });
}

function setInitialNotes(notes: Note[]) {
    const basePath = getBasePathNotInComponent();

    if (Router.asPath === basePath) {
        setNotes(notes);

        const doneCount = notes.filter((note) => note.completed).length;
        const undoneCount = notes.length - doneCount;

        if (doneCount > undoneCount) {
            Router.push(`${basePath}/done`);
        } else {
            Router.push(`${basePath}/todo`);
        }
    }
}

export function smartAppDataHandler(action: InputActionType) {
    switch (action.type) {
        case 'done_note':
            markNoteDone(action.payload.id);
            break;
        case 'add_note':
            addNote(action.payload.note);
            break;
        case 'delete_note':
            deleteNote(action.payload.id);
            break;
        case 'set_initial_notes': {
            if (Router.router) {
                setInitialNotes(action.payload);
            } else {
                waitForRouter().then(() => setInitialNotes(action.payload));
            }
            break;
        }

        default:
            throw new Error();
    }
}

export function useInitialNotes() {
    return useAssistantQuery<GetInitialNotesCommand, SetInitialNotesCommand>(
        { type: 'notes' },
        { refetchOnWindowFocus: false },
    );
}
