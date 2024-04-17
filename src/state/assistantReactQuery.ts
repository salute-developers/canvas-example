import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';

import { InputActionType } from '../scenario/types';
import { OutputActionType } from '../types/todo';
import { assistantInstance } from '../utils/assistant';

export function useAssistantMutation<
    InputAction extends InputActionType,
    OutputAction extends OutputActionType,
    TVariables
>(
    actionCreator: (arg: TVariables) => OutputAction,
    options: Omit<UseMutationOptions<InputAction['payload'], unknown, TVariables>, 'mutationFn'>,
) {
    function mutationHandler(arg: TVariables) {
        const action = actionCreator(arg);

        if (!assistantInstance) {
            throw new Error('Assistant was not initialized');
        }

        return assistantInstance.sendActionPromisified!(action);
    }

    return useMutation({ mutationFn: mutationHandler, ...options });
}

export function useAssistantQuery<OutputAction extends OutputActionType, InputAction extends InputActionType>(
    action: OutputAction,
    options: Omit<
        UseQueryOptions<InputAction['payload'], unknown, InputAction['payload'], [OutputAction['type']]>,
        'queryKey' | 'queryFn'
    >,
) {
    return useQuery({
        queryKey: [action.type],
        queryFn: () => assistantInstance!.sendActionPromisified!(action) ?? null,
        ...options,
    });
}
