import { NeuHeader } from '@salutejs/plasma-ui';

import { NoteList } from './NoteList';

export { NoteList } from './NoteList';

export const PageIndex = () => (
    <>
        <NeuHeader arrow="minimize" />
        <NoteList />
    </>
);
