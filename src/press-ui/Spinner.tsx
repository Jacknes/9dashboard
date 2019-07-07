import * as React from 'react';
import styled, { keyframes } from './styled-components';

interface Props {
    className?: string;
    color?: string;
    size?: 'small' | 'default' | 'large';
}

const Spinner = (props: Props) => (
    <Root className={props.className} color={props.color} size={props.size}>
        <Inner />
        <Outer />
    </Root>
);

const Ring = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    margin-left: 0;
    margin-top: 0;
`;

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
`;

const Inner = styled(Ring)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    border: 2px solid transparent;
    border-top-color: ${props => props.color || props.theme.colors.active};
    animation-name: ${spin};
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.75, 0.25, 0.25, 0.75);
    animation-duration: 1s;
`;

const Outer = styled(Ring)`
    border: 2px solid ${props => props.color || props.theme.colors.active};
    opacity: 0.2;
`;

const Root = styled.div<Props>`
    width: 1.5em;
    height: 1.5em;
    ${p => p.size === 'small' && 'width: 1.3em; height: 1.3em'};

    position: relative;
    margin: 0;

    ${Inner} {
        ${p => p.color && `border-top-color: ${p.color}`};
    }

    ${Outer} {
        ${p => p.color && `border-color: ${p.color}`};
    }
`;

export default Spinner;
