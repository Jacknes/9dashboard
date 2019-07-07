declare module '*.jpg';
declare module '*.png';
declare module '*.gif';

declare type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

declare type NullReturnType<T> = T extends (...args: any[]) => infer R ? R : null;

declare type NonUndefined<A> = A extends undefined ? never : A;

// Missing from redux-persist def.
declare module 'redux-persist/lib/stateReconciler/autoMergeLevel2' {
    import { PersistConfig } from 'redux-persist';
    export default function autoMergeLevel2<S>(
        inboundState: S,
        originalState: S,
        reducedState: S,
        { debug }: PersistConfig,
    ): S;
}
