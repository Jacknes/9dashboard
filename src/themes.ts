import { reduce } from 'lodash';
import Color from 'color';

export type ThemeColor = keyof typeof common.colors;
type ThemeColors = { [K in ThemeColor]: string };
export type Theme = typeof common & { colors: ThemeColors & { [key: string]: string | undefined } };

export const common = {
    // todo - move all to type
    fonts: {
        sizeLarge: 18,
        sizeMedium: 16,
        sizeDefault: 14,
        sizeSmall: 12,
        sizeTiny: 10,
        weightBold: 'bold',
        weightNormal: 'normal',
    },
    input: {
        small: {
            borderRadius: 4,
            minHeight: 32,
            paddingY: 6,
            paddingX: 8,
            lineHeight: 1.3,
            fontSize: 14,
            fontWeight: undefined,
            borderWidth: 1,
            iconXY: 18,
            iconPadding: 7,
        },
        medium: {
            borderRadius: 4,
            minHeight: 40,
            paddingY: 6,
            paddingX: 12,
            lineHeight: 1.3,
            fontSize: 14,
            fontWeight: undefined,
            borderWidth: 1,
            iconXY: 24,
            iconPadding: 8,
        },
        large: {
            borderRadius: 4,
            minHeight: 48,
            paddingY: 14,
            paddingX: 16,
            lineHeight: 1.3,
            fontSize: 14,
            fontWeight: undefined,
            borderWidth: 1,
            iconXY: 24,
            iconPadding: 12,
        },
        ludicrous: {
            borderRadius: 4,
            minHeight: 48,
            paddingY: 14,
            paddingX: 16,
            lineHeight: 1.3,
            fontSize: 20,
            fontWeight: 'bold',
            borderWidth: 1,
            iconXY: 24,
            iconPadding: 12,
        },
    },
    select: { paddingY: 12, paddingX: 16, minHeight: 48 },
    selectList: { itemY: 40, paddingY: 4 },
    choiceList: { choiceXY: 18, choiceMarginLeft: 8 },
    mediaEditor: { itemX: 60, itemY: 60 },
    dimensions: {
        spacingWide: 40,
        spacingMedium: 24,
        spacingSmall: 8,
        spacingTiny: 4,
        borderRadiusInput: 2,
        dragCloneX: 250,
        dragCloneBorder: 6,
        contentMaxWidth: 800,
    },
    zIndexes: {
        richTextEditor: 2,
        richTextToolbar: 10,
        richTextPopover: 11,
        popover: 11,
        message: 20,
        modal: 100,
        modalSaving: 12,
        themeSwitcher: 100,
        layoutHeader: 100,
        siteSelector: 100,
        richTextEditorFullscreen: 100,
        toolTip: 100,
    },
    linkPopup: {
        width: 340,
    },
    anim: {
        siteSelector: { dur: 200 },
        linkPopup: { dur: 150 },
        popover: { dur: 150, scale: 0.95 },
    },
    type: {
        headingOne: { fontSize: 56, lineHeight: 64, letterSpacing: -0.5, fontWeight: 400 },
        headingTwo: { fontSize: 36, lineHeight: 48, letterSpacing: 0, fontWeight: 600 },
        headingThree: { fontSize: 24, lineHeight: 32, letterSpacing: 0, fontWeight: 500 },
        headingFour: { fontSize: 21, lineHeight: 28, letterSpacing: 0, fontWeight: 500 },
        subTitleOne: { fontSize: 18, lineHeight: 24, letterSpacing: 0, fontWeight: 600 },
        subTitleTwo: { fontSize: 16, lineHeight: 24, letterSpacing: 0, fontWeight: 600 },
        subTitleThree: { fontSize: 14, lineHeight: 20, letterSpacing: 0, fontWeight: 600 },
        bodyLarge: { fontSize: 18, lineHeight: 24, letterSpacing: 0, fontWeight: 400 },
        bodyBase: { fontSize: 16, lineHeight: 24, letterSpacing: 0, fontWeight: 400 },
        bodySmall: { fontSize: 14, lineHeight: 20, letterSpacing: 0, fontWeight: 400 },
        button: { fontSize: 14, lineHeight: 20, letterSpacing: 0.5, fontWeight: 600 },
        captionOne: { fontSize: 12, lineHeight: 16, letterSpacing: 0.25, fontWeight: 400 },
        captionTwo: { fontSize: 12, lineHeight: 16, letterSpacing: 0.25, fontWeight: 600 },
        overline: { fontSize: 10, lineHeight: 16, letterSpacing: 1, fontWeight: 600 },
    },
    colors: {
        reversed: '#FFF',
        valid: '#00C200',
        invalid: '#FF454E',
        active: '#1890FF',
        activeDark: '#0884FB',
        activeDarker: '#396DD0',
        textPrimary: '#333333',
        textSecondary: '#737373',
        textTertiary: '#ABABAB',
        textDisabled: '#EEEEEE',
        textDefault: '#333333',
        textMedium: '#666666',
        textLight: '#999999',
        borderControl: '#333333',
        border: '#333333',
        bgInput: '#FFFFFF',
        bgFaint: '#F1F1F1',
        bgDefault: '#FFFFFF',
        flatButtonHover: '#E1E1E1',
        flatButtonActive: '#DDDDDD',
        editorPopupBg: '#FFFFFF',
        editorPopupInputBg: '#FFFFFF',
        sidebarBg: '#F6F6F6',
        sidebarText: '#737373',
        grey1: '#F5F5F5',
        grey2: '#E5E5E5',
        grey3: '#ABABAB',
        grey4: '#737373',
        grey5: '#333333',
        grey6: '#E6E6E6',
        grey7: '#9A9A9A',
        blue: '#1890FF',
        teal: '#0EC6DC',
        purple: '#6200EE',
        green: '#00C200',
        lightGreen1: '#F2FCF2',
        lightGreen2: '#CCF3CC',
        lightGreen3: '#008000',
        yellow: '#FFE200',
        amber: '#FF9500',
        red: '#FF4D4D',
        lightRed1: '#FFF9F2',
        lightRed2: '#FFEACC',
        lightRed3: '#B16800',
        black: '#000000',
        white: '#FFFFFF',
        toolTipBg: '#222222',
        semiTransparentBg: 'rgba(0, 0, 0, 0.5)',
        semiTransparentBgLight: 'rgba(0, 0, 0, 0.2)',
        semiTransparentBlue: 'rgba(24, 144, 255, 0.1)',
        semiTransparentActive: 'rgba(24, 144, 255, 0.4)',
    },
    brandColors: {
        facebook: '#3B5998',
        twitter: '#49A1F2',
        pinterest: '#C8222C',
        instagram: '#AB2DB4',
    },
};

const darkColors: ThemeColors = reduce(
    common.colors,
    (result: any, color, key) => {
        let c = new Color(color);

        // preserve colors, invert shades
        c = c.saturationl() < 10 ? c.negate() : c;

        // desaturate very bright colours slightly
        c = c.saturationl() > 75 ? c.desaturate(0.25) : c;

        // lighten dark shades by setting a floor
        if (c.lightness() < 50 && c.saturationl() === 0) {
            c = c.mix(Color('#FFFFFF'), 0.075);
        }

        result[key] = c.string();

        return result;
    },
    {} as any,
);

const bananaColors: any = {
    ...common.colors,
    bgDefault: '#ffe139',
    grey2: '#e8cc31',
};

const light = common;

const dark = {
    ...common,
    colors: {
        ...common.colors,
        ...darkColors,
    },
};

const banana = {
    ...common,
    colors: {
        ...common.colors,
        ...bananaColors,
    },
};

const themes: { [theme: string]: Theme } = {
    light,
    dark,
    banana,
};

export default themes;
