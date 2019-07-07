declare module 'react-page-visibility' {
    import * as React from 'react';

    interface PageVisibilityProps {
        onChange(isVisible: boolean): any;
    }

    class PageVisibility extends React.Component<PageVisibilityProps> {}

    export default PageVisibility;
}
