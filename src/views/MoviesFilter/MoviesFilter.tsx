import styled from "styled-components";
import {useState} from "react";
import {useHistory} from "react-router";

export const MoviesFilter = () => {

    const [searchValue, setSearchValue] = useState('')

    const Body = styled.div`
      width: 100%;
      height: 100%;
      margin: 15px 0 15px 0;
      display: flex;
      flex-direction: row;
      align-content: space-between;
    `;

    const history = useHistory();
    const onChangeSearchValue = (newValue) => {
        setSearchValue(newValue);
        history.push("/movies/" + newValue);
    };

    return (
      <Body>
          <input type="text" value={searchValue} placeholder="Search movies..."
                 onChange={e => onChangeSearchValue(e.target.value)} />
          <select>
              <option>On Netflix</option>
          </select>
      </Body>
    );
};
