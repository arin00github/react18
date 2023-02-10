import styled, { DefaultTheme } from "styled-components";

// Define our button, but with the use of props.theme this time
export const LightTheme: DefaultTheme = {
    bg: {
        page: "#F9F9F9",
    },
    text: {
        black: "#000000",
        dark: "#171717",
        mild: "#595959",
        light: "#9a9a9a",
        white: "#ffffff",
    },
};
