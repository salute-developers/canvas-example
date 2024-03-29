import { createMatchers, SaluteHandler, SaluteRequest, Surface, Device } from '@salutejs/scenario';

import { DeviceFamily } from '../types';

import { data } from './data';
import { AddNoteCommand, DeleteNoteCommand, DoneNoteCommand, NoteVariable, SetInitialNotesCommand } from './types';

const { selectItem } = createMatchers<SaluteRequest<NoteVariable>>();

const SURFACE_TO_PLATFORM_MAP: Partial<Record<Surface, DeviceFamily>> = {
    SBERBOX: 'sberbox',
    TIME: 'sberbox',
    SATELLITE: 'sberbox',
    TV: 'sberbox',
    TV_HUAWEI: 'sberbox',
    COMPANION: 'mobile',
    SBOL: 'mobile',
    STARGATE: 'portal',
};

const getDeviceFamily = (device: Device | undefined): DeviceFamily => {
    if (!device?.surface) {
        return 'mobile';
    }

    const client = SURFACE_TO_PLATFORM_MAP[device.surface];

    return client || 'mobile';
};

export const runAppHandler: SaluteHandler = ({ res, req }) => {
    res.appendSuggestions(['Запиши купить молоко', 'Добавь запись помыть машину']);
    res.setPronounceText('начнем');
    res.appendBubble('Начнем');

    res.appendCommand<SetInitialNotesCommand>({
        type: 'set_initial_notes',
        payload: data.notes,
    });

    const { device } = req.request.payload;

    res.overrideFrontendEndpoint(`${req.appInfo.frontendEndpoint}/${req.character}/@${getDeviceFamily(device)}`);
};

export const noMatchHandler: SaluteHandler = ({ res }) => {
    res.setPronounceText('Я не понимаю');
    res.appendBubble('Я не понимаю');
};

export const addNote: SaluteHandler<SaluteRequest<NoteVariable>> = ({ req, res }) => {
    const { note } = req.variables;
    res.appendCommand<AddNoteCommand>({ type: 'add_note', payload: { note } });
    res.appendSuggestions(['Запиши купить молоко', 'Добавь запись помыть машину']);
    res.setPronounceText('Добавлено');
    res.appendBubble('Добавлено');
    res.setAutoListening(true);
};

export const doneNote: SaluteHandler<SaluteRequest<NoteVariable>> = ({ req, res }) => {
    const { note } = req.variables;
    const item = selectItem({ title: note })(req);

    if (note && item?.id) {
        res.appendCommand<DoneNoteCommand>({
            type: 'done_note',
            payload: { id: item.id },
        });

        res.setPronounceText('Умничка');
        res.appendBubble('Умничка');
    }
};

export const deleteNoteApproved: SaluteHandler<SaluteRequest<NoteVariable>, { itemId: string }> = ({
    res,
    session,
}) => {
    const { itemId } = session;

    res.appendCommand<DeleteNoteCommand>({
        type: 'delete_note',
        payload: { id: itemId },
    });

    res.setPronounceText('Удалено');
    res.appendBubble('Удалено');
};

export const deleteNoteCancelled: SaluteHandler = ({ res }) => {
    res.setPronounceText('Удаление отменено');
    res.appendBubble('Удаление отменено');
};

export const deleteNote: SaluteHandler<SaluteRequest<NoteVariable>, { itemId: string }> = ({ req, res, session }) => {
    const { note } = req.variables;
    const item = selectItem({ title: note })(req);

    if (note && item?.id) {
        session.itemId = item.id;

        res.setPronounceText('Вы уверены?');
        res.appendBubble('Вы уверены?');
        res.appendSuggestions(['продолжить', 'отменить']);
    }
};

export const getInitialNotes: SaluteHandler = ({ res }) => {
    res.appendCommand({
        type: 'set_initial_notes',
        payload: data.notes,
    });
};
