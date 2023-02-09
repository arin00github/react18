// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import { server } from "./mock/server";

/**
 * msw를 사용하려면 browser, node 두가가지 다 셋팅되어야 함
 * broswer는 웹사이트 화면상에서 작동하는 것
 * node는 로컬 컴퓨터 node가 작동하는 것
 */

beforeAll(() => server.listen({}));

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
