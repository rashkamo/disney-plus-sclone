import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import db from "../firebase";

function Detail() {
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    db.collection("movies")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setDetailData(doc.data());
        } else {
          console.log("theres no object");
        }
      })
      .catch((error) => {
        console.log("error is for" + error);
      });
  }, [id]);

  return (
    <Container>
      <Background>
        <img src={detailData.cardImg} alt="" />
      </Background>
      <ImageTitle>
        <img src={detailData.titleImg} alt="" />
      </ImageTitle>
      <Controls>
        <PlayButton>
          <img src="/images/play-icon-black.png" alt="" />
          <span>Play</span>
        </PlayButton>
        <TrailerButton>
          <img src="/images/play-icon-white.png" alt="" />
          <span>Trailer</span>
        </TrailerButton>
        <AddButton>
          <span> + </span>
        </AddButton>
        <GroupWatchButton>
          <img src="/images/group-icon.png" alt="" />
        </GroupWatchButton>
      </Controls>
      <Subtitle>{detailData.subTitle}</Subtitle>
      <Description>{detailData.description}</Description>
    </Container>
  );
}

export default Detail;

const Container = styled.div`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
`;
const Background = styled.div`
  position: fixed;
  z-index: -1;
  opacity: 0.6;
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 678px) {
    width: 100vw;
    height: 100vh;
    position: fixed;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      inset: 0px;
    }
  }
`;
const ImageTitle = styled.div`
  height: 30vh;
  width: 35vw;
  min-height: 170px;
  min-width: 200px;
  margin: 20px 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 600px) {
    min-height: 50px;
    height: 20vh;
    width: 25vw;
    margin-bottom: 0;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
`;

const PlayButton = styled.div`
  border-radius: 4px;
  font-size: 15px;
  padding: 0px 25px;
  margin-right: 22px;
  display: flex;
  align-items: center;
  height: 56px;
  background: rgb(249, 249, 249);
  color: black;
  border: none;
  letter-spacing: 1.8px;
  cursor: pointer;

  &:hover {
    background: rgb(198, 198, 198);
  }
  @media (max-width: 600px) {
    font-size: 10px;
    padding: 0px 10px;
    height: 40px;
    margin-right: 10px;
  }
`;
const TrailerButton = styled(PlayButton)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: egb(249, 249, 249);
  text-transform: uppercase;
  color: white;
  @media (max-width: 600px) {
    font-size: 10px;
    padding: 0px 8px;
    height: 40px;
  }
`;
const AddButton = styled.button`
  width: 44px;
  height: 44px;
  display: flex;
  margin-right: 16px;
  background: white;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  background-color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  border-radius: 50%;

  span {
    font-size: 18px;
    color: white;
  }
  @media (max-width: 600px) {
    width: 35px;
    height: 35px;
    margin-right: 10px;
  }
`;
const GroupWatchButton = styled(AddButton)`
  background: rgb(0, 0, 0);
`;

const Subtitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;
  margin-top: 26px;
  @media (max-width: 600px) {
    margin-top: 15px;
    font-size: 10px;
  }
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 15px;
  margin-top: 16px;
  color: rgb(249, 249, 249);
  max-width: 760px;
  @media (max-width: 600px) {
    font-size: 10px;
    margin-top: 8px;
    max-width: 590px;
  }
`;
