import React from 'react';
import styled from '../styled-components';

interface Props {
    label?: string;
    required?: boolean;
    htmlFor: string;
    className?: string;
    as?: React.ReactType;
}

const Label: React.SFC<Props> = ({ label, required, htmlFor, as, className }) => (
    <Root htmlFor={htmlFor} className={className} as={as}>
        {label}
        {required && <Required>*</Required>}
    </Root>
);

const Root = styled.label`
    display: block;
    font-size: ${p => `${p.theme.type.captionTwo.fontSize}px`};
    color: ${p => p.theme.colors.textMedium};
    font-weight: ${p => p.theme.fonts.weightBold};
`;

const Required = styled.span`
    display: inline-block;
    color: ${p => p.theme.colors.invalid};
`;

export default Label;
