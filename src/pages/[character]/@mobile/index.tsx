import { PageIndex } from '../../../components/PageIndex';
import { getCharacterStaticPaths } from '../../../utils/character';

export const getStaticPaths = getCharacterStaticPaths;
export const getStaticProps = () => ({ props: {} });

export default function MobileIndex() {
    return <PageIndex />;
}
