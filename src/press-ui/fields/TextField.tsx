import React, { useState } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import styled, { css } from '../styled-components';
import Icon, { IconType } from '../Icon';
import Field from './Field';
import { FieldProps } from '../types';

type Size = 'small' | 'medium' | 'ludicrous';

type OmittedHtmlProps =
    | 'name'
    | 'value'
    | 'autoComplete'
    | 'size'
    | 'onChange'
    | 'onFocus'
    | 'onBlur'
    | 'onKeyDown'
    | 'ref';
type HtmlProps = Omit<React.HTMLProps<HTMLInputElement | HTMLTextAreaElement>, OmittedHtmlProps>;

interface Props extends FieldProps<string>, HtmlProps {
    helperText?: string;
    validate?: boolean;
    multiline?: boolean;
    autoComplete?: boolean;
    autoGrow?: boolean;
    icon?: IconType;
    iconLocation?: IconLocationType;
    size?: Size;
    maxRows?: number;
}

type IconLocationType = 'left' | 'right';

const TextField = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
    const {
        name,
        value,
        size = 'medium',
        icon,
        iconLocation = 'right',
        validate,
        disabled,
        autoComplete,
        multiline,
        autoGrow,
        helperText,
        onChange,
        onFocus,
        onBlur,
        as,
        ...rest
    } = props;

    const [focused, setFocused] = useState(false);

    const handleFocus = (e: React.FocusEvent) => {
        setFocused(true);
        onFocus && onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent) => {
        setFocused(false);
        onBlur && onBlur(e);
    };

    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        onChange(name, value);
    };

    const InputComponent = multiline ? (autoGrow ? TextareaAutosize : Textarea) : Input;
    return (
        <Field {...props}>
            <InputWrapper
                size={size}
                iconLocation={iconLocation}
                hasIcon={!!icon}
                validate={validate}
                disabled={disabled}
            >
                <InputComponent
                    {...rest}
                    name={name}
                    value={value}
                    disabled={disabled}
                    autoComplete={autoComplete ? 'on' : 'off'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    ref={ref as any}
                />
                <InputBackdrop focused={focused} disabled={disabled} size={size} />
                {icon && (
                    <IconWrapper iconLocation={iconLocation} size={size}>
                        <Icon type={icon} size={24} />
                    </IconWrapper>
                )}
            </InputWrapper>
            {helperText && <HelperText>{helperText}</HelperText>}
        </Field>
    );
});

const IconWrapper = styled.span<Pick<Props, 'iconLocation'> & { size: Size }>`
    display: block;
    position: absolute;
    width: 24px;
    height: 24px;
    top: ${p => `${p.theme.input[p.size].iconPadding}px`};
    ${p => `${p.iconLocation}: ${p.theme.input[p.size].paddingX}px`};
    z-index: 2;
    color: ${p => p.theme.colors.grey4};
    margin: auto;
    pointer-events: none;
`;

type InputWrapperProps = {
    iconLocation: Props['iconLocation'];
    size: Size;
    hasIcon: boolean;
    validate?: boolean;
    disabled?: boolean;
};
const InputWrapper = styled.span<InputWrapperProps>`
    position: relative;
    display: flex;
    align-items: center;
    ${p => `
        min-height: ${p.theme.input[p.size].minHeight}px;
        padding: ${p.theme.input[p.size].paddingY}px ${p.theme.input[p.size].paddingX}px;
    `};

    textarea,
    input {
        position: relative;
        outline: none;
        resize: none;
        width: 100%;
        flex-grow: 1;
        z-index: 2;
        display: block;
        -webkit-appearance: none;
        border: none;
        background: none;
        padding: 0;
        font-family: inherit;
        ${p => `
            font-size: ${p.theme.input[p.size].fontSize}px;
            font-weight: ${p.theme.input[p.size].fontWeight || 'normal'};
            color: ${p.theme.colors.textDefault};
            line-height: ${p.theme.input[p.size].lineHeight};
            color: ${p.theme.colors.textDefault};
        `};

        &::placeholder {
            color: ${p => p.theme.colors.textLight};
        }
    }

    ${p =>
        p.hasIcon &&
        `padding-${p.iconLocation}: ${p.theme.input[p.size].paddingX * 2 +
            p.theme.input[p.size].iconXY}px`};

    ${p => p.validate && validationStyles};
    ${p => p.disabled && fieldDisabledStyles};
`;

export const InputBackdrop = styled.span<{ size: Size; focused: boolean; disabled?: boolean }>`
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background-color: ${p => p.theme.colors.bgInput};
    border: solid ${p => p.theme.input[p.size].borderWidth}px ${p => p.theme.colors.borderControl};
    border-radius: ${p => p.theme.input[p.size].borderRadius}px;
    ${p => p.focused && `border-color: ${p.theme.colors.active}`};
`;

const fieldDisabledStyles = css`
    opacity: 0.4;
    pointer-events: none;
`;

const validationStyles = css`
    input:invalid ~ ${InputBackdrop} {
        border: 1px solid ${p => p.theme.colors.invalid};
        box-shadow: none;
    }
`;

const HelperText = styled.span`
    display: block;
    font-size: ${p => p.theme.type.captionOne.fontSize}px;
    color: ${p => p.theme.colors.textLight};
    margin-top: 8px;
`;

const Input = styled.input``;
const Textarea = styled.textarea``;

export default TextField;
