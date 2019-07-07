declare module 'utf8' {
    interface UTF8 {
        decode(data: string): string;
    }

    const UTF8: UTF8;

    export default UTF8;
}
