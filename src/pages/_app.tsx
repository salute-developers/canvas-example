import type { AppProps } from 'next/app';
import { StyleSheetManager } from 'styled-components';
import Head from 'next/head';
import { Container, DeviceThemeProvider } from '@salutejs/plasma-ui';
import { QueryClientProvider } from 'react-query';
import { spatnavInstance } from '@salutejs/spatial';
import { useEffect } from 'react';

import { useCharacterTheme } from '../utils/character';
import { queryClient } from '../state/state';
import { GlobalInsets } from '../components/GlobalInsetsVars';
import { earlyInit } from '../utils/assistant';
import { ProjectGlobalStyle } from '../components/ProjectGlobalStyle';
import { getPlatformByPath } from '../utils/platform';

// инициализируем наше приложение данными до инициализации ассистента
earlyInit();

function MyApp({ Component, pageProps, router }: AppProps) {
    const { platform, isSberbox, isPortal } = getPlatformByPath(router.asPath);
    const CharacterTheme = useCharacterTheme();

    const detectDeviceCallback = () => {
        switch (platform) {
            case 'mobile':
                return 'mobile';
            case 'portal':
                return 'sberPortal';
            case 'sberbox':
            default:
                return 'sberBox';
        }
    };

    useEffect(() => {
        if (isSberbox || isPortal) {
            spatnavInstance.init();
        }

        return () => {
            if (isSberbox || isPortal) {
                spatnavInstance.unInit();
            }
        };
    }, [isSberbox, isPortal]);

    return (
        <>
            <Head>
                <title>Твой Canvas</title>
                <meta name="description" content="Твой Canvas" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <StyleSheetManager disableVendorPrefixes={isSberbox || isPortal}>
                <DeviceThemeProvider detectDeviceCallback={detectDeviceCallback}>
                    <QueryClientProvider client={queryClient}>
                        <CharacterTheme />
                        <ProjectGlobalStyle />
                        <GlobalInsets />
                        <Container>
                            <Component {...pageProps} />
                        </Container>
                    </QueryClientProvider>
                </DeviceThemeProvider>
            </StyleSheetManager>
        </>
    );
}
export default MyApp;
