import Router from 'next/router';

import { PlatformType } from '../types';

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

export const detectDeviceCallback = (platform: PlatformType) => {
    return () => {
        if (platform === 'mobile') {
            return 'mobile';
        }

        if (platform === 'portal') {
            return 'sberPortal';
        }

        return 'sberBox';
    };
};

export const isRunInCypress = typeof window !== 'undefined' && window.Cypress;
