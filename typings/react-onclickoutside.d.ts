declare module 'react-onclickoutside' {
    import * as React from 'react';

    export interface HandleClickOutside<T> {
        handleClickOutside: React.MouseEventHandler<T>;
    }

    export interface InjectedOnClickOutProps {
        disableOnClickOutside?(): void;
        enableOnClickOutside?(): void;
    }

    export interface OnClickOutProps {
        disableOnClickOutside?: boolean;
        eventTypes?: string | string[];
        outsideClickIgnoreClass?: string;
        preventDefault?: boolean;
        stopPropagation?: boolean;
    }

    export type ComponentConstructor<P> =
        | React.ComponentClass<P, any>
        | React.StatelessComponent<P>;

    export interface ClickOutComponentClass<P extends InjectedOnClickOutProps>
        extends React.ComponentClass<P, any> {
        new (props: P, context?: any): React.Component<P, any> & HandleClickOutside<any>;
    }

    export default function OnClickOut<P>(
        component: ClickOutComponentClass<P & InjectedOnClickOutProps>,
    ): React.ComponentClass<P & OnClickOutProps>;
}
