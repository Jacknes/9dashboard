import * as Styled from 'styled-components';
import { Theme } from './themes';

const {
    default: styled,
    css,
    keyframes,
    createGlobalStyle,
    withTheme,
    ThemeProvider,
} = Styled as Styled.ThemedStyledComponentsModule<Theme>;

export type StyledProps<P> = Styled.ThemedStyledProps<P, Theme>;

export * from 'styled-components';
export { css, keyframes, createGlobalStyle, withTheme, ThemeProvider };
export default styled;
