declare module 'exif-js' {
    import * as React from 'react';

    interface Exif {
        getData(image: HTMLImageElement, callback: () => any): any;
    }

    const Exif: Exif;

    export default Exif;
}
