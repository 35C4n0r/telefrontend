import React, {useMemo, useState} from "react";
import {Input} from "@material-tailwind/react";
import WorldTable from "./WorldTable";
import ChartOne from "./ChartOne";
import {useDispatch, useSelector} from "react-redux";
import {getCountries} from "../controller/Redux/dataSlice";
import ChartTwo from "./ChartTwo";


/***
 * This Component is the main Home Page of our Project, served on "/" route, and can only be accessed if the user is logged in.
 * @returns {JSX.Element}
 * @constructor
 */
export default function DashboardPage() {

    const [query, setQuery] = useState({
        country: "Afghanistan",
        date: new Date().toISOString().slice(0, 10)
    })


    function handleInputChange(event) {
        const field = event.target.name;
        const newState = {...query, [field]: event.target.value}
        setQuery(newState);
    }

    function createDropdownOptions(data) {
        return (
            <option key={data}>{data}</option>
        )
    }

    const dispatch = useDispatch();

    const {countryList} = useSelector((store) => store.stats);

    useMemo(() => {
        dispatch(getCountries());
    }, []);


    return (
        <div className={"container mt-32 flex mx-auto flex-col items-center"}>
            <div
                className={"container md:flex md:flex-row md:items-center md:justify-evenly md:h-auto flex flex-col justify-evenly items-center h-52"}>
                <div className={"inline-block relative w-64"}>
                    <select name={"country"} onChange={handleInputChange} label={"Select Country"}
                            className={"block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"}>
                        {countryList.map(createDropdownOptions)}
                    </select>
                    <div
                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                    </div>
                </div>
                <div className={""}>
                    <Input name={"date"} type={"date"} onChange={handleInputChange} label={"History Since"}
                           defaultValue={query.date}/>
                </div>
            </div>
            <div className={"w-full"}>
                <div className={"mt-28"}>
                    <WorldTable/>
                </div>

                <div className={"flex flex-row w-full justify-evenly flex-wrap"}>
                    <div className={"mt-28"}>
                        <ChartOne props={query}/>
                    </div>
                    <div className={"mt-28"}>
                        <ChartTwo props={query}/>
                    </div>
                </div>

            </div>
        </div>
    )
}