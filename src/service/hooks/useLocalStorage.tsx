import React, { useState } from "react";

export const useLocalStorage = (keyName: string, defaultValue: string) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = window.localStorage.getItem(keyName);
            if (value) {
                return JSON.parse(value);
            } else {
                window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } catch (err) {
            return defaultValue;
        }
    });

    const setValue = (newValue: string) => {
        try {
            window.localStorage.setItem(keyName, JSON.stringify(newValue));
        } catch (err) {
            setStoredValue(newValue);
        }
    };

    const getValue = (insertKeyname: string) => {
        const targetValue = window.localStorage.getItem(insertKeyname);
        if (targetValue) {
            return JSON.parse(targetValue);
        } else {
            return undefined;
        }
    };

    return [storedValue, setValue, getValue];
};
