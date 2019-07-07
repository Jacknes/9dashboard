import { Theme, ThemeColor } from '../themes';
import styled from './styled-components';

interface Props {
    size?: keyof Theme['fonts'];
    weight?: keyof Theme['fonts'];
    color?: ThemeColor;
}

const Text = styled.span<Props>`
    display: block;
    font-size: ${p => p.size && `${p.theme.fonts[p.size]}px`};
    font-weight: ${p => p.weight && p.theme.fonts[p.weight]};
    color: ${p => p.color && p.theme.colors[p.color]};
`;

export default Text;
