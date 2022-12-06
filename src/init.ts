import { Character, Theme } from '@salutejs/client';

export const readAppInitiaData = () => {
    (() => {
        return new Promise<void>((resolve) => {
            const wait = () => {
                if (window.appInitialData != null) {
                    resolve();

                    return;
                }
                setTimeout(wait);
            };

            wait();
        });
    })().then(() => {
        const uiCommands = window.appInitialData.reduce<{ character: Character; theme: Theme }>((acc, command) => {
            if (command.type === 'character' || command.type === 'theme') {
                const key = command.type as keyof typeof command;
                // тут я сдался
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                acc[(command.type as unknown) as string] = command[key];
            }

            return acc;
        }, {} as { character: Character; theme: Theme });

        if (Object.keys(uiCommands).length === 0) {
            document.documentElement.style.setProperty('--plasma-character', 'sber');
            document.documentElement.style.setProperty('--plasma-theme', 'dark');

            return;
        }

        document.documentElement.style.setProperty('--plasma-character', uiCommands.character.id);
        document.documentElement.style.setProperty('--plasma-theme', uiCommands.theme.name);
    });
};
