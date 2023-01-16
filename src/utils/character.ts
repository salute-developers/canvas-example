import { CharacterId } from '@salutejs/client';
import { GetStaticPaths } from 'next';
import Router, { useRouter } from 'next/router';
import { createGlobalStyle } from 'styled-components';
import { darkEva, darkJoy, darkSber } from '@salutejs/plasma-tokens';

const themes = {
    sber: createGlobalStyle(darkSber),
    eva: createGlobalStyle(darkEva),
    joy: createGlobalStyle(darkJoy),
};

export const getCharacterStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [{ params: { character: 'eva' } }, { params: { character: 'sber' } }, { params: { character: 'joy' } }],
        fallback: false,
    };
};

const knownCharacters = ['sber', 'joy', 'eva'] as const;

const isKnownCharacter = (character?: string): character is CharacterId => {
    return knownCharacters.includes(character as CharacterId);
};

// работает корректно для пре-рендера
export const useCharacter = (): CharacterId => {
    const router = useRouter();
    const { character } = router.query;

    if (typeof character === 'string' && isKnownCharacter(character)) {
        return character;
    }

    return 'sber';
};

export const replaceCharacterInUrl = (character: CharacterId) => {
    return Router.asPath.replace(new RegExp(`/(${knownCharacters.join('|')})(.*)`), `/${character}$2`);
};

export const useCharacterTheme = () => {
    const initialCharacter = useCharacter();

    return themes[initialCharacter];
};
