import {
    Card,
    CardContent,
    Container,
    Row,
    Col,
    TextField,
    LineSkeleton,
    Cell,
    TextBox,
    Checkbox,
} from '@salutejs/plasma-ui';
import { FormEvent } from 'react';

import { Note } from '../types/todo';

const NULL_NOTE = {
    id: '',
    completed: false,
    title: '',
};

type Props = {
    inputValue?: string;
    notes?: Note[];
    onCheckNote?: (note: Note) => void;
    onInputSubmit?: (e: FormEvent<HTMLFormElement>) => void;
    onInputChange?: (newValue: string) => void;
};

const SKELETON_NOTES = [NULL_NOTE, NULL_NOTE, NULL_NOTE];

export const NoteList = ({ notes = SKELETON_NOTES, onCheckNote, onInputSubmit, inputValue, onInputChange }: Props) => {
    return (
        <Container style={{ margin: '5rem 0 7rem' }}>
            <Row>
                <Col size={12} sizeXL={6} offsetXL={3}>
                    <form onSubmit={onInputSubmit}>
                        <TextField
                            label="Add Note"
                            disabled={!onInputSubmit}
                            value={inputValue}
                            onChange={(e) => onInputChange && onInputChange(e.target.value)}
                        />
                    </form>
                </Col>
            </Row>
            <Row style={{ marginTop: '2rem' }}>
                {notes.map((n, i) => (
                    <Col key={i} size={12} sizeXL={6} offsetXL={3} style={{ marginBottom: '1rem' }}>
                        <Card>
                            <CardContent compact>
                                {n === NULL_NOTE ? (
                                    <LineSkeleton size="headline1" />
                                ) : (
                                    <Cell
                                        content={<TextBox title={`${i + 1}. ${n.title}`} />}
                                        contentRight={
                                            <Checkbox checked={n.completed} onChange={() => onCheckNote?.(n)} />
                                        }
                                    />
                                )}
                            </CardContent>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};
