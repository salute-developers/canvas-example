import { PageNote } from './PageNote';

export default function PageTodoUndone() {
    return <PageNote noteFilter={(note) => !note.completed} title="Todo" nextPageUrl="done" />;
}
