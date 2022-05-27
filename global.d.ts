import { AssistantWindow } from '@salutejs/client';

declare global {
    declare namespace NodeJS {
        interface ProcessEnv {
            readonly NEXT_PUBLIC_RELEASE: string;
        }
    }
    interface Window extends AssistantWindow {
        Cypress?: Record<string, any>;
    }
}

export {};
