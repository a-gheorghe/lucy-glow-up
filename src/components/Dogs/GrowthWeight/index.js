import React, { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { GrowthWeightForm } from "./GrowthWeightForm";
import { LineChart } from "./LineChart";
import firebase from "../../../firebase/clientApp";
import { useUser } from "../../../contexts/userContext";
import { isAdmin } from "../../../utils/isAdmin";

const GrowthWeightBase = (props) => {
  const ChartContainer = styled.div`
    & svg {
      overflow: unset !important;
    }
  `;

  const user = useUser().user;
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
      {isAdmin(user) && <GrowthWeightForm />}
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
