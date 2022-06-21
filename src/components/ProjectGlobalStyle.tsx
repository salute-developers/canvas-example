import { createGlobalStyle } from 'styled-components';
import { background, gradient, text } from '@salutejs/plasma-tokens';

/* stylelint-disable selector-nested-pattern */
export const ProjectGlobalStyle = createGlobalStyle`
    /* stylelint-disable selector-max-universal */
    * {
        box-sizing: border-box;
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        -webkit-tap-highlight-color: transparent; /* i.e. Nexus5/Chrome and Kindle Fire HD 7'' */
    }
    /* stylelint-enable selector-max-universal */

    html {
        font-size: 32px;
        user-select: none;
    }

    body {
        font-family: 'SB Sans Text', sans-serif;
        height: auto;
        min-height: 100%;
        padding-top: var(--top-inset) var(--right-inset) var(--bottom-inset) var(--left-inset);
    }

    body::before {
        content: '';
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
