import styled from "styled-components";

export const Spacer = styled.div`
  width: ${props => props.theme.width || 0};
  height: ${props => props.theme.height || 0};
`;
