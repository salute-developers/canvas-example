import { useState, useEffect } from 'react';
import { Button, NeuHeader } from '@salutejs/plasma-ui';
import { useRouter } from 'next/router';
import { useSection } from '@salutejs/spatial';

import { addNote, markNoteDone, useInitialNotes } from '../state/state';
import { useAssistantMutation } from '../state/assistantReactQuery';
import { DoneNoteCommand as DoneNoteCommandOutput, Note } from '../types/todo';
import { DoneNoteCommand as DoneNoteCommandInput } from '../scenario/types';
import { isServer, useBasePath } from '../utils/utils';
import { assistantInstance, assistantState } from '../utils/assistant';

import { NoteList } from './NoteList';

type Props = {
    noteFilter: (note: Note) => boolean;
    nextPageUrl: string;
    title?: string;
};

export const PageNote = ({ noteFilter, title = '', nextPageUrl }: Props) => {
    const { push, back } = useRouter();
    const { data: notes = [], isLoading, isIdle } = useInitialNotes();
    const filteredNotes = notes.filter(noteFilter);
    const basePath = useBasePath();
    const [sectionProps] = useSection('NoteSection');

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
    const arrowClickHandler = arrowState === 'minimize' ? assistantInstance?.close : back;

    return (
        <div {...sectionProps}>
            <NeuHeader title={title} arrow={arrowState} onArrowClick={arrowClickHandler}>
                <Button size="s" onClick={() => push(`${basePath}/${nextPageUrl}`)}>
                    {`Go to ${nextPageUrl}`}
                </Button>
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
        </div>
    );
};
