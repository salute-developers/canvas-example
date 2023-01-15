import { useRouter } from 'next/router';

import { getPlatformByPath } from '../utils/platform';

export const usePlatform = () => {
    const { asPath } = useRouter();

    return getPlatformByPath(asPath);
};
