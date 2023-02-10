import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        bg?: {
            page: string;
        };
        text?: {
            black: string;
            dark: string;
            mild: string;
            light: string;
            white: string;
        };
        white?: {
            op100: string;
            op60: string;
            op50: string;
            op30: string;
            op20: string;
            op10: string;
        };
        main?: string;
    }
}
