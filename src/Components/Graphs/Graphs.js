import React from "react";
import styles from "./Graphs.module.css";
import { Typography, Container } from "@material-ui/core";
import ScrollUpButton from "react-scroll-up-button";

const Graphs = () => {
  return (
    <Container maxWidth="xl">
      <div className={styles.divh}>
        <Typography variant="h3">Powered by DOMO</Typography>
      </div>
      <iframe
        title="Continent filter"
        src="https://public.domo.com/embed/pages/bYzKp?transparentBackground=true"
        marginheight="0"
        marginwidth="0"
        frameborder="0"
        width="100%"
        height="10400px"
      ></iframe>
      <ScrollUpButton />
    </Container>
  );
};

export default Graphs;
