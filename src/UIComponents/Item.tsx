import styled from "styled-components";

export const Item = styled.div`
  display: flex;
  align-self: ${props => props.theme.alignSelf || 'center'};
  width: ${props => props.theme.width || 'auto'};
  height: ${props => props.theme.height || 'auto'};
`;
