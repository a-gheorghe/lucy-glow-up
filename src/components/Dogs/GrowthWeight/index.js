import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";
import { LineChart } from "./LineChart";
import * as ROUTES from "../../../constants/routes";

import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import firebase from "../../../firebase/clientApp";

const GrowthWeightBase = (props) => {
  const history = useHistory();
  const navigateToForm = () => {
    history.push(ROUTES.LUCY_GROWTH_WEIGHT_ADD);
  };
  const ChartContainer = styled.div`
    & svg {
      overflow: unset !important;
    }
  `;

  const [weights, setWeights] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("lucy-growth-weight")
      .orderBy("date")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWeights(data);
      });
  }, [props.firebase]);

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          zIndex: "100",
        }}
        onClick={navigateToForm}
      >
        <AddIcon />
      </Fab>
      <ChartContainer>
        <LineChart
          data={weights.map((weight) => ({
            x: new Date(dayjs.unix(weight.date)),
            y: weight.weight,
          }))}
        />
      </ChartContainer>
    </>
  );
};

export default GrowthWeightBase;
