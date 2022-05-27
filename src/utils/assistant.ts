import {
    AssistantAppState,
    createAssistant,
    createSmartappDebugger,
    AssistantClientCustomizedCommand,
    AssistantNavigationCommand,
    SdkMeta,
} from '@salutejs/client';
import Router from 'next/router';

import { Assistant } from '../types/todo';
import { InputActionType } from '../scenario/types';
import { smartAppDataHandler } from '../state/state';

import { replaceCharacterInUrl } from './character';

// eslint-disable-next-line import/no-mutable-exports
export let assistantInstance: Assistant | undefined;

export const assistantState: { current: AssistantAppState } = {
    current: {},
};
export const getState = () => assistantState.current;

export const initAssistant = () => {
    if (!process.env.NEXT_PUBLIC_IS_DEVELOPMENT) {
        assistantInstance = createAssistant({
            getState,
        });
    }

    if (process.env.NEXT_PUBLIC_SMARTAPP_TOKEN && process.env.NEXT_PUBLIC_SMARTAPP_INIT_PHRASE) {
        assistantInstance = createSmartappDebugger({
            token: process.env.NEXT_PUBLIC_SMARTAPP_TOKEN,
            initPhrase: process.env.NEXT_PUBLIC_SMARTAPP_INIT_PHRASE,
            getState,
        });
    }

    return assistantInstance;
};

interface AssistantSmartAppData {
    type: 'smart_app_data';
    // eslint-disable-next-line camelcase
    smart_app_data: InputActionType;
    // eslint-disable-next-line camelcase
    sdk_meta?: SdkMeta;
}

export const dataHandler = (command: AssistantClientCustomizedCommand<AssistantSmartAppData>) => {
    let navigation: AssistantNavigationCommand['navigation'] | undefined;

    switch (command.type) {
        case 'character':
            {
                const newUrl = replaceCharacterInUrl(command.character.id);

                if (newUrl !== Router.asPath) {
                    Router.replace(newUrl);
                }
                // 'sber' | 'eva' | 'joy';
            }
            break;
        case 'navigation':
            navigation = (command as AssistantNavigationCommand).navigation;
            break;
        case 'smart_app_data':
            smartAppDataHandler(command.smart_app_data);
            break;
        default:
            break;
    }

    if (navigation) {
        switch (navigation.command) {
            case 'UP':
                window.scrollTo(0, window.scrollY - 500);
                break;
            case 'DOWN':
                window.scrollTo(0, window.scrollY + 500);
                break;
            default:
                break;
        }
    }
};

export const earlyInit = () => {
    if (typeof window !== 'undefined' && Array.isArray(window.appInitialData)) {
        for (const command of window.appInitialData) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            dataHandler(command);
        }
    }
};
