import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getImage } from '../fetchFunctions';

const StyledHamsterWrapper = styled.div`
    margin: 0 2em;
    display: flex;
    flex-direction: column;
    align-items: center;

    > img {
        object-fit: cover;
        width: 400px;
        height: 400px;
    }
`;

const BattleHamster = ({ hamster, handleClick }) => {
    const [img, setImg] = useState(null);

    useEffect(() => {
        if (hamster) {
            const updateImage = async () => {
                setImg(await getImage(hamster));
            }
            updateImage();
        }
    }, [hamster]);

    return (
        <StyledHamsterWrapper>
            {hamster &&
                <>
                    <h2>{hamster.name}</h2>
                    <img src={img} alt="hamster" onClick={() => handleClick(hamster)} />
                </>
            }
        </StyledHamsterWrapper>
    )
}

export default BattleHamster;
