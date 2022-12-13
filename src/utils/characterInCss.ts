/**
 * Работает только на клиенте, на сервере работать не будет, так как есть обращения к DOM структуре
 */
import { useEffect, useCallback, useState } from 'react';
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

const readCharacterFromCss = () => {
    if (!isClient) {
        return 'sber';
    }

    const cssCharacter = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue(propValue.character) as CharacterId;

    if (knownCharacters.includes(cssCharacter)) {
        return cssCharacter;
    }

    return 'sber';
};

export const useCharacterFromCss = () => {
    const [currentCharacter, setCurrentCharacter] = useState<CharacterId>(() => {
        return readCharacterFromCss();
    });

    const handle = useCallback((event: CustomEvent<{ character: CharacterId }>) => {
        setCurrentCharacter(event.detail.character);
    }, []);

    useEffect(() => {
        document.addEventListener('character.set', handle);

        return () => {
            document.removeEventListener('character.set', handle);
        };
    }, []);

    return currentCharacter;
};

export const replaceCharacter = (nextCharacter: CharacterId) => {
    document.documentElement.style.setProperty(propValue.character, nextCharacter);

    const ev = new CustomEvent<{ character: CharacterId }>('character.set', {
        detail: { character: nextCharacter },
        bubbles: true,
        cancelable: true,
    });

    document.body.dispatchEvent(ev);
};

export const useCharacterTheme = () => {
    const char = useCharacterFromCss();

    return themes[char];
};
