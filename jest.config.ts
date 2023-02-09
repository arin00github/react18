import type { Config } from "jest";

const config: Config = {
    preset: "react-native",
    clearMocks: true,
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    // setupFiles: ['<rootDir>/setupTests.js'],
    setupFilesAfterEnv: [
        /***** 엄청중요. msw가 node에서 돌아가게 하려면 여기롤 꼭 설정해야 함 */
        // '@testing-library/jest-native/extend-expect',
        "<rootDir>/setupTests.js",
    ],
    //   moduleNameMapper: {
    //     '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
    //       'identity-obj-proxy',
    //   },
    transform: {
        "^.+\\.(js)$": "babel-jest",
    },
    // testMatch: ['<rootDir>/__tests__/*-{spec,test}.{js,jsx,ts,tsx}'],
};

export default config;
