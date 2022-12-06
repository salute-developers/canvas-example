import { AssistantWindow, CharacterId, ThemeColorName } from '@salutejs/client';

declare global {
    interface DocumentEventMap {
        'character.set': CustomEvent<{ character: CharacterId }>;
        'theme.set': CustomEvent<{ theme: ThemeColorName }>;
    }

    declare namespace NodeJS {
        interface ProcessEnv {
            readonly NEXT_PUBLIC_RELEASE: string;
        }
    }
    interface Window extends AssistantWindow {
        Cypress?: Record<string, any>;
    }

    interface Document {
        addEventListenter<K extends CanvasCustomEvents>(type: K, listener: (this: CanvasCustomEvents[K], ev: CanvasCustomEvents[K]) => void, options?: EventListenerOptions | boolean): void;
    }
}

export {};
