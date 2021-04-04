import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { withFirebase } from '../../Firebase';
import { GrowthWeightForm } from './GrowthWeightForm';
import { LineChart } from './LineChart';

const GrowthWeightBase = (props) => {
    const ChartContainer = styled.div`
        & svg {
            overflow: unset !important;
        }
    `;

    const [weights, setWeights] = useState([]);

    useEffect(() => {
        props.firebase
      .firestore
      .collection("lucy-growth-weight")
      .orderBy('date')
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWeights(data);
      })
    }, [props.firebase])

    return (
        <>
        <GrowthWeightForm />
        <ChartContainer>
            <LineChart data={weights.map(weight => ({ x: new Date(dayjs.unix(weight.date)), y: weight.weight }))}/>
        </ChartContainer>
        </>
    )
}

export default withFirebase(GrowthWeightBase);