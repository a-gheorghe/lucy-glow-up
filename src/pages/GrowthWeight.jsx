import React, { useEffect, useState, useContext } from 'react';
import { GrowthWeightForm } from '../components/GrowthWeightForm';
import { LineChart } from '../components/LineChart';
import { UserContext } from '../providers/UserProvider';
import { firebase } from '../firebase';
import styled from 'styled-components';
import dayjs from 'dayjs';

export const GrowthWeight = () => {
    const user = useContext(UserContext)
    console.log('user is', user);

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
      .orderBy('date')
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("All data in 'lucy-growth-weight' collection", data);
        setWeights(data);
      })
    }, [])

    console.log('weights are', weights);

    return (
        <>
        {user && user.admin && <GrowthWeightForm />}
        <ChartContainer>
            <LineChart data={weights.map(weight => ({ x: new Date(dayjs.unix(weight.date)), y: weight.weight }))}/>
        </ChartContainer>
        </>
    )
}