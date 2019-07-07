import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

configure({
    adapter: new Adapter(),
});

// For async tests, catch all errors here so we don't have to try / catch
// everywhere for safety
process.on('unhandledRejection', error => {
    console.log(error);
});

jest.mock('@sentry/browser', () => {
    const scopeMock = {
        setExtra: jest.fn(),
    };
    return {
        captureException: jest.fn(),
        config: () => ({ install: jest.fn() }),
        withScope: jest.fn(fn => {
            fn(scopeMock);
        }),
        scopeMock,
    };
});

jest.mock('htmlclean', () => html => html);

// Images don't get required correctly in jest.
jest.mock('src/static/hero.jpg', () => jest.fn());
jest.mock('src/static/construction.gif', () => jest.fn());
jest.mock('src/static/nothing.png', () => jest.fn());

// Often creates a long require chain.
jest.mock('src/components/Image', () => 'Image');

// Often creates a long require chain.
jest.mock('src/utils/api-fetch', () => jest.fn(() => Promise.resolve()));

// Calls ReactDom.render when required.
jest.mock('src/index', () => {});

// Dispatches actions and what not.
jest.mock('src/auth', () => {});

// window.getSelection not implemented https://github.com/jsdom/jsdom/issues/321
window.getSelection = () => {
    return {
        removeAllRanges: () => {},
    };
};
