declare module '@nec-network/thumbor-url' {
    enum TrimOption {
        TRIM_TOP_LEFT = 'top-left',
        TRIM_BOTTOM_RIGHT = 'bottom-right',
    }

    enum HorizontalAlignOption {
        HALIGN_LEFT = 'left',
        HALIGN_CENTER = 'center',
        HALIGN_RIGHT = 'right',
    }

    enum VerticalAlignOption {
        VALIGN_TOP = 'top',
        VALIGN_MIDDLE = 'middle',
        VALIGN_BOTTOM = 'bottom',
    }

    export type enums = TrimOption | HorizontalAlignOption | VerticalAlignOption;

    type UrlBuilderOptions = Partial<{
        meta: boolean;
        trim: boolean | TrimOption;
        crop: boolean | { top?: number; left?: number; bottom?: number; right?: number };
        width: number | 'orig';
        height: number | 'orig';
        smart: boolean;
        halign: HorizontalAlignOption;
        valign: VerticalAlignOption;
        filters: Array<string>;
    }>;

    export class UrlBuilder {
        constructor(serviceUrl: string, securityKey?: string);

        private serviceUrl: string;
        private securityKey: string;

        url(image: string, opts?: UrlBuilderOptions): string;
        meta(image: string, opts?: UrlBuilderOptions): Promise<any>;
    }

    export default function(serviceUrl: string, securityKey?: string): UrlBuilder;
}
