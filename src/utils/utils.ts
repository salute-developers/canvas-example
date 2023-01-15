import Router from 'next/router';

import { DeviceFamily } from '../types';
import { usePlatform } from '../hooks/usePlatform';

import { useCharacter } from './character';
import { getPlatformByPath } from './platform';

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

export const detectDeviceCallback = (platform: DeviceFamily) => {
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

export const waitForRouter = (): Promise<void> =>
    new Promise((res) => {
        const recursiveUpdate = () => {
            if (Router.router) {
                res();

                return;
            }
            setTimeout(recursiveUpdate);
        };

        recursiveUpdate();
    });
