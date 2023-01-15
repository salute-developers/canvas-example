import Router from 'next/router';

import { DeviceFamily } from '../types';

export const getPlatformByPath = (asPath: string) => {
    const [, platform] = asPath.match(/@(\w+)/) ?? [];

    return {
        platform: platform as DeviceFamily,
        isSberbox: platform === 'sberbox',
        isPortal: platform === 'portal',
        isMobile: platform === 'mobile',
    };
};

// вызывать только на клиенте
export const getPlatformNotInComponent = () => {
    const { asPath } = Router;

    return getPlatformByPath(asPath);
};
