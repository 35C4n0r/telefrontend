import React, {useEffect} from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import {useDispatch, useSelector} from "react-redux";
import {Typography} from "@material-tailwind/react";
import Spinner from "./Spinner";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);


/***
 * This component returns the Polar Chart component for the Dashboard Page
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function ChartTwo(props) {

    const dispatch = useDispatch();

    const {countryData, chartSpinner} = useSelector((store) => store.stats);
    useEffect(() => {
    }, [dispatch, props.props]);

    const data = {
        labels: ['Recovered', 'Died'],
        datasets: [
            {
                label: '# of Votes',
                data: [countryData.recovered/10, countryData.deaths],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return(
        <>
            {chartSpinner ? <Spinner/> : countryData.population >= 0 ? <PolarArea data={data}/> : <Typography>Data Not Available</Typography>}
        </>

    )
}
