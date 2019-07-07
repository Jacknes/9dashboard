import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from './styled-components';
import { Home } from './routes';
import themes from './themes';
import Layout from './components/Layout';

// const theme = themes.light;
// const theme = themes.dark;

const App = () => {
    const handleDarkModeClick = (mode: string) => {
        if (theme === 'light') {
            return setTheme('dark');
        }
        if (theme === 'dark') {
            return setTheme('banana');
        }
        setTheme('light');
    };

    const [theme, setTheme] = useState('light');

    return (
        <ThemeProvider theme={themes[theme]}>
            <Root>
                <Router>
                    <Layout onDarkModeClick={handleDarkModeClick}>
                        <Switch>
                            <Route exact path="/" component={Home} />
                        </Switch>
                    </Layout>
                </Router>
                <GlobalStyle />
            </Root>
        </ThemeProvider>
    );
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: ${p => p.theme.colors.bgDefault};
  }
`;

const Root = styled.div`
    margin: 0;
    font-size: ${p => p.theme.fonts.sizeDefault}px;
    font-family: 'Inter UI', system-ui, -apple-system, 'Segoe UI', BlinkMacSystemFont, sans-serif;
    color: ${props => props.theme.colors.textPrimary};
    box-sizing: border-box;
    & * {
        box-sizing: border-box;
    }
    height: 100%;
    min-height: 100%;
`;

export default hot(module)(App);
