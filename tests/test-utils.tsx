import React from 'react';
import { render, RenderOptions } from 'react-testing-library';
import { ThemeProvider } from 'src/styled-components';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import createStore from 'src/store/create-store';
import themes from 'src/themes';
import { State } from 'src/types/store';
import { DeepPartial } from 'redux';

const history = createMemoryHistory();

const customRender = (
    ui: React.ReactElement,
    initialState?: DeepPartial<State>,
    options?: RenderOptions,
) => {
    const { store } = createStore(initialState);

    const Providers: React.FunctionComponent = ({ children }) => {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <ThemeProvider theme={themes.light}>{children}</ThemeProvider>
                </Router>
            </Provider>
        );
    };

    return render(ui, { wrapper: Providers, ...options });
};

export * from 'react-testing-library';

export { customRender as render };
