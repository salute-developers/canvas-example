import { PageNote } from './PageNote';

export default function PageTodoDone() {
    return <PageNote noteFilter={(note) => note.completed} title="Done" nextPageUrl="todo" />;
}
