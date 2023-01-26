import React from "react";

import { useLocation } from "react-router-dom";
import styled from "styled-components";

const DivStyle = styled.div`
    padding: 0 2rem;
    margin-top: 3rem;
`;

export const LocationDisplay = () => {
    const location = useLocation();

    return <DivStyle data-testid="location-display">url: {location.pathname}</DivStyle>;
};
