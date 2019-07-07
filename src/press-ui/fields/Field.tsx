import * as React from 'react';
import { map } from 'lodash';
import styled, { StyledProps } from '../styled-components';
import { FieldProps, FieldMessage, FieldMessageType } from '../types';
import RawLabel from './Label';

// Priority of message types: Error > Warning > Success
const getPriorityType = (messages: Array<FieldMessage> | undefined) => {
    if (!(messages && messages.length)) {
        return undefined;
    }

    const types = map(messages, 'type');
    if (types.includes('error')) {
        return 'error';
    } else if (types.includes('warning')) {
        return 'warning';
    } else if (types.includes('success')) {
        return 'success';
    }

    return undefined;
};

interface Props extends FieldProps<any> {
    focusable?: boolean;
    onFocus?: (e: React.FocusEvent) => any;
    onBlur?: (e: React.FocusEvent) => any;
    children: React.ReactNode;
}

const Field: React.FC<Props> = ({
    name,
    label,
    messages,
    required,
    focusable,
    children,
    className,
    onFocus,
    onBlur,
}) => {
    const priorityType = getPriorityType(messages);

    return (
        <Root className={className}>
            {label && (
                <Label label={label} htmlFor={name} type={priorityType} required={required} />
            )}
            {children}
            {messages && (
                <Messages>
                    {messages.map((message, i) => (
                        <Message key={i} type={message.type}>
                            {message.text}
                        </Message>
                    ))}
                </Messages>
            )}
            {focusable && <Focusable tabIndex={-1} onFocus={onFocus} onBlur={onBlur} />}
        </Root>
    );
};

export const getColor = (p: StyledProps<{ type?: FieldMessageType }>) => {
    switch (p.type) {
        case 'success':
            return p.theme.colors.valid;
        case 'warning':
            return p.theme.colors.amber;
        case 'error':
            return p.theme.colors.invalid;
    }
};

const Root = styled.span`
    display: block;
    position: relative;
    flex-grow: 1;
`;

type LabelProps = { type: FieldMessageType };
const Label = styled(RawLabel)<LabelProps>`
    margin-bottom: 8px;
    color: ${p => getColor(p) || p.theme.colors.grey4};
`;

const Messages = styled.span`
    display: block;
    margin-top: 8px;
`;

type MessageProps = { type?: FieldMessageType };
const Message = styled.span<MessageProps>`
    display: block;
    font-size: ${p => p.theme.fonts.sizeSmall}px;
    color: ${p => getColor(p) || p.theme.colors.grey4};
    margin-top: 4px;

    &:first-child {
        margin-top: 0;
    }
`;

const Focusable = styled.span`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    pointer-events: none;
`;

export default Field;
