import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { createGlobalStyle, StyleSheetManager } from 'styled-components';
import Head from 'next/head';
import { Container, DeviceThemeProvider } from '@salutejs/plasma-ui';
import { darkSber, darkJoy, darkEva } from '@salutejs/plasma-tokens/themes';
import { text, background, gradient } from '@salutejs/plasma-tokens';
import { QueryClientProvider } from 'react-query';

import { useCharacter } from '../utils/character';
import { usePlatform } from '../utils/platform';
import { queryClient } from '../state/state';
import { OutputActionType } from '../types/todo';
import { InputActionType } from '../scenario/types';
import { GlobalInsets } from '../components/GlobalInsetsVars';
import { assistantInstance, initAssistant, dataHandler, earlyInit } from '../utils/assistant';

const themes = {
    sber: createGlobalStyle(darkSber),
    eva: createGlobalStyle(darkEva),
    joy: createGlobalStyle(darkJoy),
};

/* stylelint-disable selector-nested-pattern */
const ProjectTheme = createGlobalStyle`
  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-tap-highlight-color: transparent; /* i.e. Nexus5/Chrome and Kindle Fire HD 7'' */
  }
  html {
    font-size: 32px;
    user-select: none;
  }
  body {
    font-family: "SB Sans Text", sans-serif;
    height: auto;
    min-height: 100%;
    padding-top: var(--top-inset);
    padding-bottom: var(--bottom-inset);
    padding-left: var(--left-inset);
    padding-right: var(--right-inset);
  }
  body:before {
    content: "";
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    color: ${text};
    background: ${gradient};
    background-color: ${background};
    background-attachment: fixed;
    background-size: 100vw 100vh;
    z-index: -2;
  }
`;
/* stylelint-enable */

// инициализируем наше приложение данными до инициализации ассистента
earlyInit();

function MyApp({ Component, pageProps, router }: AppProps) {
    const { platform, isSberbox, isPortal } = usePlatform(router);
    const initialCharacter = useCharacter();

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

    // инициализация ассистента
    useEffect(() => {
        const assistant = initAssistant();

        if (assistant === undefined) {
            return;
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        assistantInstance.on('data', dataHandler);

        assistant.sendActionPromisified = (actionToSend: OutputActionType) => {
            return new Promise<InputActionType['payload']>((resolve, reject) => {
                const unsubscribe = assistant.sendAction<InputActionType>(
                    actionToSend,
                    (action) => {
                        resolve(action.payload);
                        unsubscribe();
                    },
                    // todo add type
                    (error: unknown) => {
                        reject(error);
                        unsubscribe();
                    },
                );
            });
        };
    }, []);

    const CharacterTheme = themes[initialCharacter];

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
                        <ProjectTheme />
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
