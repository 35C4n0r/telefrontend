import {Grid} from 'gridjs-react';
import "gridjs/dist/theme/mermaid.min.css";
import {useDispatch, useSelector} from "react-redux";
import React, {useMemo} from "react";
import {getAllData} from "../controller/Redux/dataSlice";
import Spinner from "./Spinner";

/***
 * This component returns the Table component for the Dashboard Page
 * @returns {JSX.Element}
 * @constructor
 */
export default function WorldTable() {

    const dispatch = useDispatch();

    const {allData, tableSpinner} = useSelector((store) => store.stats);

    useMemo(() => {
        dispatch(getAllData());
    }, [])

    return (
        tableSpinner ? <Spinner/> : <Grid data={allData} columns={["Country", "Deaths", "active"]} fixedHeader={true} pagination={{limit: 10,}}/>

    );
}