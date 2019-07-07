declare module 'htmlclean' {
    interface HtmlClean {
        (html: string): string;
    }

    const HtmlClean: HtmlClean;

    export default HtmlClean;
}
