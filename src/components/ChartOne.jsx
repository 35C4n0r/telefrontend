import React, {useEffect} from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import {useDispatch, useSelector} from "react-redux";
import {postCountryData} from "../controller/Redux/dataSlice";
import {Typography} from "@material-tailwind/react";
import Spinner from "./Spinner";

ChartJS.register(ArcElement, Tooltip, Legend);

/***
 * This component returns the Pie Chart component for the Dashboard Page
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function ChartOne(props){
    const dispatch = useDispatch();

    const {countryData, chartSpinner} = useSelector((store) => store.stats);
    useEffect(() => {
        dispatch(postCountryData(props.props));
    }, [dispatch, props.props]);


    const data = {
        labels: ['Infected', 'Healthy'],
        datasets: [
            {
                label: '# of Population',
                data: [countryData.active, (countryData.population - countryData.active) / 10],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };


    return(
        <>
            {chartSpinner ? <Spinner/> : countryData.population >= 0 ? <Pie data={data}/> : <Typography>Data Not Available</Typography>}
            {/*<Pie data={data}/>*/}
        </>
    )
}

