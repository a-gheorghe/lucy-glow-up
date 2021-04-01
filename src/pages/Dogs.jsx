import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

export const Dogs = () => {
    const lucyBirth = dayjs('2020-12-01');
    const plexBirth = dayjs('2012-02-26');

    const lucyAge = dayjs(Date.now()).diff(lucyBirth, 'years', true);
    const plexAge = dayjs(Date.now()).diff(plexBirth, 'years', true);

    const lucyYears = Math.floor(lucyAge);
    const lucyMonths = Math.floor(12 * (lucyAge - lucyYears));

    const plexYears = Math.floor(plexAge);
    const plexMonths = Math.floor(12 * (plexAge - plexYears));
    
    


    return (
        <>
        <div> This is the section about dogs</div>
        <div> I have two dogs</div>
            <div>Lucy is a great dane and she is {lucyYears} years and {lucyMonths} months old. </div>
            <div>
                <Link to="/dogs/lucy/growth-pictures">Growth progress pictures</Link>
            </div>
            <div>
                <Link to="/dogs/lucy/growth-weight">Growth progress weight</Link>
            </div>
            <div>
                Plexus is a golden retriever and he is {plexYears} years and {plexMonths} months old.
            </div>

        </>
    )
}