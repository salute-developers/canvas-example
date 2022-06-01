import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';

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

    return useMutation(mutationHandler, options);
}

export function useAssistantQuery<OutputAction extends OutputActionType, InputAction extends InputActionType>(
    action: OutputAction,
    options: Omit<
        UseQueryOptions<InputAction['payload'], unknown, InputAction['payload'], OutputAction['type']>,
        'queryKey' | 'queryFn'
    > = {},
) {
    return useQuery(action.type, () => assistantInstance!.sendActionPromisified!(action), options);
}
