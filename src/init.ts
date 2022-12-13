import { Character, Theme } from '@salutejs/client';

interface UiCommands {
    character: Character;
    theme: Theme;
}

export const readAppInitiaData = () => {
    new Promise<void>((resolve) => {
        const wait = () => {
            if (window.appInitialData != null) {
                resolve();

                return;
            }
            setTimeout(wait);
        };

        wait();
    }).then(() => {
        const uiCommands = {} as UiCommands;

        for (const commnand of window.appInitialData) {
            if (commnand.type === 'character') {
                uiCommands.character = commnand.character;
            }

            if (commnand.type === 'theme') {
                uiCommands.theme = commnand.theme;
            }
        }

        if (Object.keys(uiCommands).length === 0) {
            document.documentElement.style.setProperty('--plasma-character', 'sber');
            document.documentElement.style.setProperty('--plasma-theme', 'dark');

            return;
        }

        document.documentElement.style.setProperty('--plasma-character', uiCommands.character.id);
        document.documentElement.style.setProperty('--plasma-theme', uiCommands.theme.name);
    });
};
