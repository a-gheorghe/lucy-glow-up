import React, { useEffect, useState } from 'react';
import { GrowthPicturesForm } from './GrowthPicturesForm';
import { Timeline } from './Timeline';
import { withFirebase } from '../../Firebase';

const GrowthPicturesBase = (props) => {

    const [pictures, setPictures] = useState([]);

    useEffect(() => {
        props.firebase
      .firestore
      .collection("lucy-growth-pictures")
      .orderBy('date')
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPictures(data);
      })
    }, [props.firebase])

    return (
        <>
        <GrowthPicturesForm />
        <div>
          Month: <a href="#March-2021">March 2021</a>
          
        </div>
        <div style={{ width: '100vw', position: 'relative', margin: '0 auto' }}>
            <Timeline data={pictures} />
        </div>
        </>
    )
}

export const GrowthPictures = withFirebase(GrowthPicturesBase);