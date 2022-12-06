/**
 * Работает только на клиенте, на сервере работать не будет, так как есть обращения к DOM структуре
 */
import React from 'react';
import { CharacterId } from '@salutejs/client';
import { createGlobalStyle } from 'styled-components';
import { darkEva, darkJoy, darkSber } from '@salutejs/plasma-tokens';

export const knownCharacters = ['sber', 'eva', 'joy'] as const;

export const isClient = typeof window !== 'undefined';

export const propValue = {
    character: '--plasma-character',
    theme: '--plasma-theme',
};

export const themes = {
    sber: createGlobalStyle(darkSber),
    eva: createGlobalStyle(darkEva),
    joy: createGlobalStyle(darkJoy),
};

const getComputedDocumentStyles = () => window.getComputedStyle(document.documentElement);

const readCharacterFromCss = (): CharacterId => {
    const cssCharacter = getComputedDocumentStyles().getPropertyValue(propValue.character) as CharacterId;

    if (knownCharacters.includes(cssCharacter)) {
        return cssCharacter;
    }

    return 'sber';
};

export const useCharacterFromCss = () => {
    const [currentCharacter, setCurrentCharacter] = React.useState<CharacterId>(() => {
        if (isClient) {
            return readCharacterFromCss();
        }

        return 'sber';
    });

    const handle = React.useCallback((event: CustomEvent<{ character: CharacterId }>) => {
        setCurrentCharacter(event.detail.character);
    }, []);

    React.useEffect(() => {
        if (isClient) {
            document.addEventListener('character.set', handle);

            return () => {
                document.removeEventListener('character.set', handle);
            };
        }
    }, []);

    return currentCharacter;
};

export const replaceCharacter = (nextCharacter: CharacterId) => {
    if (isClient) {
        document.documentElement.style.setProperty(propValue.character, nextCharacter);

        const ev = new CustomEvent<{ character: CharacterId }>('character.set', {
            detail: { character: nextCharacter },
            bubbles: true,
            cancelable: true,
        });

        document.body.dispatchEvent(ev);
    }
};

export const useCharacterTheme = () => {
    const char = useCharacterFromCss();

    return themes[char];
};
