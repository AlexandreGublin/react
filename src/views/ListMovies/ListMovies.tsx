import {Button} from "../../UIComponents/Button";
import {Link} from "react-router-dom";
import {AnimatePresence, AnimateSharedLayout, motion} from "framer-motion"
import {useState} from "react";
import {Container} from "../../UIComponents/Container";
import {Item} from "../../UIComponents/Item";
import styled from "styled-components";
import {Spacer} from "../../UIComponents/Spacer";

export const ListMovies = ({type, movies}) => {

    const ImgMovie = styled.img`
      height: 290px;
      width: 215px;
      text-align: center;
      margin: auto;
    `;

    const TitleMovie = styled.p`
      margin: auto;
      color: white;
      font-weight: bold;
      text-align: center;
    `;

    return (
      <>
          <Spacer theme={{height: '20px'}}/>
          {movies.length > 0 ?
              <Container theme={{direction: 'row', justifyContent: 'space-between'}}>
                  {movies.map((movie) =>
                      <Item theme={{height: '325', width: '215px', alignSelf: 'start'}} key={movie.id}>
                          <motion.li layoutId={movie.id}>
                              <Link className='link' to={"/"+ type +"/" + movie.id}>
                                  <motion.div>
                                      <ImgMovie src={movie.poster}/>
                                      <TitleMovie>{movie.title}</TitleMovie>
                                      <Spacer theme={{height: '20px'}}/>
                                  </motion.div>
                              </Link>
                          </motion.li>
                      </Item>)}
              </Container> :
              <div>No movies</div>}
      </>
    );
};
