import type { Config } from "jest";

const config: Config = {
    preset: "react",
    clearMocks: true,
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    setupFiles: ["<rootDir>/setupTests.js"],
    //setupFilesAfterEnv: ["<rootDir>/src/mock.setup.ts"],
    // moduleNameMapper: {
    //     ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "identity-obj-proxy",
    // },
    transform: {
        "^.+\\.(js)$": "babel-jest",
    },
    testMatch: ["<rootDir>/src/__tests__/*-{spec,test}.{js,jsx,ts,tsx}"],
    transformIgnorePatterns: [],
};

export default config;
