import { useState, useEffect } from 'react';
import { HeaderButton, NeuHeader } from '@salutejs/plasma-ui';
import Router from 'next/router';

import { addNote, markNoteDone, useInitialNotes } from '../state/state';
import { useAssistantMutation } from '../state/assistantReactQuery';
import { DoneNoteCommand as DoneNoteCommandOutput, Note } from '../types/todo';
import { DoneNoteCommand as DoneNoteCommandInput } from '../scenario/types';
import { isServer, useBasePath } from '../utils/utils';
import { assistantInstance, assistantState } from '../utils/assistant';

import { NoteList } from './NoteList';

type Props = {
    noteFilter: (note: Note) => boolean;
    title?: string;
    nextPageUrl: string;
};

export const PageNote = ({ noteFilter, title = '', nextPageUrl }: Props) => {
    const { data: notes = [], isLoading, isIdle } = useInitialNotes();
    const filteredNotes = notes.filter(noteFilter);
    const basePath = useBasePath();

    useEffect(() => {
        assistantState.current = {
            item_selector: {
                items: filteredNotes.map(({ id, title: noteTitle }, index) => ({
                    number: index + 1,
                    id,
                    title: noteTitle,
                })),
            },
        };

        return () => {
            assistantState.current = {};
        };
    }, [filteredNotes]);

    const [note, setNote] = useState('');

    const mutation = useAssistantMutation<DoneNoteCommandInput, DoneNoteCommandOutput, string>(
        (noteTitle) => ({ type: 'done', payload: { note: noteTitle } }),
        {
            onSuccess: (data) => {
                markNoteDone(data.id);
            },
        },
    );

    const arrowState = isServer || window.history.state.idx <= 1 ? 'minimize' : 'back';
    const arrowClickHandler = arrowState === 'minimize' ? assistantInstance?.close : Router.back;

    return (
        <>
            <NeuHeader title={title} arrow={arrowState} onArrowClick={arrowClickHandler}>
                <HeaderButton onClick={() => Router.push(`${basePath}/${nextPageUrl}`)}>
                    {`Go to ${nextPageUrl}`}
                </HeaderButton>
            </NeuHeader>
            <NoteList
                onInputSubmit={(e) => {
                    e.preventDefault();
                    addNote(note);
                    setNote('');
                }}
                notes={isLoading || isIdle ? undefined : filteredNotes}
                onCheckNote={(n) => mutation.mutate(n.title)}
                inputValue={note}
                onInputChange={setNote}
            />
        </>
    );
};
