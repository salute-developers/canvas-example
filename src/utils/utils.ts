import Router from 'next/router';

import { useCharacter } from './character';
import { getPlatformByPath, usePlatform } from './platform';

// работает корректно для пре-рендера
export const useBasePath = () => {
    const character = useCharacter();
    const { platform } = usePlatform();

    return `/${character}/@${platform}`;
};

// вызывать только на клиенте
export const getBasePathNotInComponent = () => {
    const {
        asPath,
        query: { character },
    } = Router;
    const { platform } = getPlatformByPath(asPath);

    return `/${character}/@${platform}`;
};

export const isServer = typeof window === 'undefined';
