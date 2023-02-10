export type JsonUser = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

export type JsonPost = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

export interface IProcessState {
    process: "init" | "input" | "progress" | "result" | "result-fail" | "confirm";
    message: string;
    action: string;
}

export type FormInfoGroupProps = {
    name: string;
    required: boolean;
    regex: string;
    placeholder: string;
    defaultValue: string;
    type: "text" | "password" | "button" | "number" | "textarea";
    testValue: string;
};
