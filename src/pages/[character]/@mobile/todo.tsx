import PageTodoUndone from '../../../components/PageTodoUndone';
import { getCharacterStaticPaths } from '../../../utils/character';

export const getStaticPaths = getCharacterStaticPaths;
export const getStaticProps = () => ({ props: {} });

export default function SberboxPageTodoDone() {
    return <PageTodoUndone />;
}
