declare module 'slate-hotkeys' {
    interface Hotkeys {
        isUndo(e: React.KeyboardEvent | KeyboardEvent): boolean;
        isRedo(e: React.KeyboardEvent | KeyboardEvent): boolean;
    }

    const Hotkeys: Hotkeys;

    export default Hotkeys;
}
