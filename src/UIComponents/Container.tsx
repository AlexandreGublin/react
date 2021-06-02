import styled from "styled-components";

export const Container = styled.div`
  display: ${props => props.theme.display || 'flex'};
  flex-direction: ${props => props.theme.direction};
  height: 100%;
  width: 100%;
  align-self: center;
  justify-content: ${props => props.theme.justifyContent || 'space-between'};
  align-items: flex-start;
  flex-wrap: wrap;
`;
