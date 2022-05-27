import { AssistantClientCommand, AssistantInsetsCommand, Insets } from '@salutejs/client';
import { createGlobalStyle } from 'styled-components';

const NULL_INSETS = {
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
};

function calculateInsets({ top, right, bottom, left }: Insets): Insets {
    const devicePixelRatio = window.devicePixelRatio || 1;

    return {
        top: top / devicePixelRatio || 0,
        right: right / devicePixelRatio || 0,
        bottom: bottom / devicePixelRatio || 0,
        left: left / devicePixelRatio || 0,
    };
}

function isInsetsCommand(command: AssistantClientCommand): command is AssistantInsetsCommand {
    return command.type === 'insets';
}

const getDefaultInsets = (): Insets => {
    if (typeof window === 'undefined' || !Array.isArray(window.appInitialData)) {
        return NULL_INSETS;
    }

    const insetsCommand = window.appInitialData.find(isInsetsCommand);

    if (insetsCommand) {
        return calculateInsets(insetsCommand.insets);
    }

    return NULL_INSETS;
};

export const GlobalInsetsVars = createGlobalStyle<Insets>`
    :root {
        --top-inset: ${({ top }) => top}px;
        --bottom-inset: ${({ bottom }) => bottom}px;
        --left-inset: ${({ left }) => left}px;
        --right-inset: ${({ right }) => right}px;
    }
`;

export const GlobalInsets = () => <GlobalInsetsVars {...getDefaultInsets()} />;
