import React from "react";
import HomeHeader from "./HomeHeader";
import Animes from "./Animes";
import { Container } from "react-bootstrap";
function Home() {
  return (
    <Container>
      <HomeHeader />
      <Animes />
    </Container>
  );
}

export default Home;
