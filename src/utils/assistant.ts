import {
    AssistantAppState,
    createAssistant,
    createSmartappDebugger,
    AssistantClientCustomizedCommand,
    AssistantNavigationCommand,
    SdkMeta,
    CharacterId,
} from '@salutejs/client';
import Router from 'next/router';

import { Assistant, OutputActionType } from '../types/todo';
import { InputActionType } from '../scenario/types';
import { smartAppDataHandler } from '../state/state';

import { replaceCharacterInUrl } from './character';
import { isRunInCypress, waitForRouter } from './utils';

interface AssistantSmartAppData {
    type: 'smart_app_data';
    // eslint-disable-next-line camelcase
    smart_app_data: InputActionType;
    // eslint-disable-next-line camelcase
    sdk_meta?: SdkMeta;
}

export const assistantState: { current: AssistantAppState } = {
    current: {},
};
export const getState = () => assistantState.current;

const replaceRouterCharacter = (character: CharacterId) => {
    const newUrl = replaceCharacterInUrl(character);

    if (newUrl !== Router.asPath) {
        Router.replace(newUrl);
    }
};

export const dataHandler = (command: AssistantClientCustomizedCommand<AssistantSmartAppData>) => {
    let navigation: AssistantNavigationCommand['navigation'] | undefined;

    switch (command.type) {
        case 'character':
            if (Router.router) {
                replaceRouterCharacter(command.character.id);
            } else {
                waitForRouter().then(() => replaceRouterCharacter(command.character.id));
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

export const initAssistant = () => {
    if (typeof window === 'undefined') {
        return;
    }

    let assistant: Assistant = createAssistant({
        getState,
    });

    if (process.env.NEXT_PUBLIC_SMARTAPP_TOKEN && process.env.NEXT_PUBLIC_SMARTAPP_INIT_PHRASE && !isRunInCypress) {
        assistant = createSmartappDebugger({
            token: process.env.NEXT_PUBLIC_SMARTAPP_TOKEN,
            initPhrase: process.env.NEXT_PUBLIC_SMARTAPP_INIT_PHRASE,
            getState,
        });
    }

    assistant.on('data', dataHandler);

    assistant.sendActionPromisified = (actionToSend: OutputActionType) => {
        return new Promise<InputActionType['payload']>((resolve, reject) => {
            const unsubscribe = assistant!.sendAction<InputActionType>(
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

    return assistant;
};

export const assistantInstance: Assistant | undefined = initAssistant();

export const earlyInit = () => {
    if (typeof window !== 'undefined' && Array.isArray(window.appInitialData)) {
        for (const command of window.appInitialData) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            dataHandler(command);
        }
    }
};
