import {Container} from "../../UIComponents/Container";
import {Link} from "react-router-dom";
import {Item} from "../../UIComponents/Item";
import styled from "styled-components";
import {useState} from "react";

export const Header = ({activeTab}) => {

    const Body = styled.div`
      width: 100%;
      height: 100%;
    `;

    const Title = styled.h1`
      color: #D13F3F;
      font-size: 3em;
      margin: 0;
    `;

    const TextTab = styled.h4`
      color: ${props => props.theme.color};
      font-size: 1.2em;
      margin: auto;
      text-align: center;
    `;

    return (
        <Body>
            <Container theme={{direction: 'row', justifyContent: 'space-between'}}>
                <Item><Title>SUPDEFLIX</Title></Item>
                <Item>
                    <Container theme={{direction: 'row', justifyContent: 'flex-end'}}>
                        <Item theme={{alignSelf: 'center'}}><Link className='link' to={"/movies/"}><TextTab theme={{ color: activeTab === 'movies' ? 'white' : 'grey' }}>movies</TextTab></Link></Item>
                        <Item theme={{alignSelf: 'center'}}><Link className='link' to={"/favorites/"}><TextTab theme={{ color: activeTab === 'favorites' ? 'white' : 'grey' }}>favorites</TextTab></Link></Item>
                    </Container>
                </Item>
            </Container>
        </Body>
    );
}
