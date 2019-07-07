import * as React from 'react';
import Color from 'color';
import { Color as ColorType } from 'csstype';
import styled, { StyledProps } from './styled-components';
import RawIcon, { IconType } from './Icon';
import Spinner from './Spinner';
import { ThemeColor } from '../themes';

type ComponentPropType = React.ReactType<any>;

type PropsOf<T> = T extends React.ComponentType<infer P> ? P : React.HTMLAttributes<T>;

interface IProps<T extends ComponentPropType> {
    size: 'small' | 'default' | 'large';
    style: 'primary' | 'secondary' | 'tertiary';
    color?: ThemeColor | ColorType;
    stretch?: boolean;
    busy?: boolean;
    disabled?: boolean;
    icon?: IconType;
    iconPosition: 'left' | 'right';
    component: T;
    className?: string;
    children?: React.ReactNode;
}

export type Props<T extends ComponentPropType = 'button'> = IProps<T> &
    Omit<PropsOf<T>, keyof IProps<T>>;

const Button = <T extends ComponentPropType>(props: Props<T>) => {
    const { component, children, icon, busy, ...otherProps } = props as IProps<T>;

    return (
        <Root component={component} iconOnly={icon && !children} {...otherProps} busy={busy}>
            <Inner busy={busy} iconPosition={props.iconPosition}>
                {icon && (
                    <Icon
                        type={icon}
                        position={props.iconPosition}
                        iconOnly={!children}
                        size={props.size === 'small' ? 18 : 24}
                        busy={busy}
                    />
                )}
                {children}
            </Inner>
            {busy && (
                <BusySpinner buttonColor={props.color} style={props.style} size={props.size} />
            )}
        </Root>
    );
};

Button.defaultProps = {
    size: 'default',
    style: 'secondary',
    iconPosition: 'left',
    component: 'button',
};

const RootComponent = ({
    component: Component,
    size,
    style,
    color,
    stretch,
    icon,
    iconPosition,
    iconOnly,
    busy,
    ...props
}: RootProps) => <Component {...props} />;

type RootProps = IProps<any> & { iconOnly?: boolean };
const Root = styled(RootComponent)<RootProps>`
    display: flex;
    position: relative;
    min-height: ${p => size(p)}px;
    width: ${p => width(p)};
    flex-shrink: ${p => (p.iconOnly ? 0 : 1)};
    background: ${p => background(p)};
    color: ${p => color(p)};
    margin: 0;
    padding: ${p => (p.iconOnly ? '0' : '0 12px')};
    border-radius: 4px;
    line-height: 1;
    font-size: ${p => p.theme.fonts.sizeDefault}px;
    font-weight: bold;
    border: 1px solid
        ${p => (p.style === 'secondary' ? p.theme.colors.borderControl : 'transparent')};
    user-select: none;
    text-decoration: none;
    outline: none;
    transition: box-shadow 150ms;

    &:hover:enabled,
    &:focus:enabled {
        background: ${p => background(p, 'hover')};
        border-color: transparent;
    }

    &:active:enabled {
        background: ${p => background(p, 'active')};
        border-color: transparent;
    }

    &:disabled {
        opacity: 0.33;
        cursor: default;
    }

    ${p => p.busy && 'pointer-events: none;'};
`;

type InnerProps = {
    busy?: boolean;
    iconPosition: Props['iconPosition'];
};
const Inner = styled.span<InnerProps>`
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: ${p => (p.iconPosition === 'left' ? 'row' : 'row-reverse')};
    justify-content: center;
    align-items: center;
    opacity: ${p => (p.busy ? 0 : 1)};
`;

type IconProps = {
    position: Props['iconPosition'];
    iconOnly: boolean;
    size: number;
    busy?: boolean;
};
const Icon = styled(RawIcon)<IconProps>`
    margin: ${p => !p.iconOnly && (p.position === 'left' ? '0 8px 0 0' : '0 0 0 8px')};
    flex: none;
    ${p => p.busy && 'opacity: 0;'};
`;

type BusySpinnerProps = { buttonColor: Props['color']; style: Props['style'] };
const BusySpinner = styled(Spinner).attrs({
    color: (p: StyledProps<BusySpinnerProps>) => color({ ...p, color: p.buttonColor }),
} as any)<BusySpinnerProps>`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
`;

const size = (props: StyledProps<RootProps>): number => {
    switch (props.size) {
        case 'large':
            return 48;
        case 'small':
            return 32;
        default:
            return 40;
    }
};

const width = (props: StyledProps<RootProps>): string => {
    if (props.stretch) {
        return '100%';
    } else if (props.iconOnly) {
        return size(props) + 'px';
    } else {
        return 'auto';
    }
};

const background = (
    props: StyledProps<RootProps>,
    state?: 'hover' | 'active' | 'focus',
): string => {
    const isPrimary = props.style === 'primary';

    let colorString = '#000';
    if (props.color) {
        colorString = props.theme.colors[props.color] || props.color;
    } else if (isPrimary) {
        colorString = props.theme.colors.active;
    }

    let color = new Color(colorString);
    if (state === 'hover') {
        color = isPrimary ? color.darken(0.15) : color.alpha(0.1);
    } else if (state === 'active') {
        color = isPrimary ? color.darken(0.2) : color.alpha(0.15);
    } else {
        color = isPrimary ? color : color.alpha(0);
    }
    return color.string();
};

type ColorProps = Pick<RootProps, 'color' | 'style'>;
const color = (props: StyledProps<ColorProps>): string => {
    let color = '#737373';

    if (props.style === 'primary' && props.color !== 'white') {
        color = '#FFF';
    } else if (props.color && props.color !== 'white') {
        color = props.theme.colors[props.color] || props.color;
    }

    return color;
};

export default Button;
