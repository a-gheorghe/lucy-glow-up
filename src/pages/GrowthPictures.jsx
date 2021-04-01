import React, { useEffect, useState, useContext } from 'react';
import { GrowthPicturesForm } from '../components/GrowthPicturesForm';
import { firebase } from '../firebase';
import { UserContext } from '../providers/UserProvider';
import { Timeline } from '../components/Timeline';

export const GrowthPictures = () => {

    const user = useContext(UserContext);
    const [pictures, setPictures] = useState([]);

    useEffect(() => {
        firebase
      .firestore()
      .collection("lucy-growth-pictures")
      .orderBy('date')
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("All data in 'lucy-growth-pictures' collection", data);
        setPictures(data);
      })
    }, [])

    console.log('user is', user);
    return (
        <>
        {user && user.admin && <GrowthPicturesForm />}
        <div>
          Month: <a href="#March-2021">March 2021</a>
          
        </div>
        <div style={{ width: '100vw', position: 'relative', margin: '0 auto' }}>
            <Timeline data={pictures} />
        </div>
        </>
    )
}