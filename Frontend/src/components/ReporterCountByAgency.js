import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'

const ResultsContext = React.createContext()

export default function ReporterCountByAgency() {


    const initialState = {
        currrentReporterCountMap: ""
    }

    const [reporterCountMap, setMap] = useState(initialState)
    const map = new Map()

    useEffect(() => {
        async function fetchMyAPI() {
            let response = await axios.get("https://localhost:44307/api/Reporters")
            for (let reporter of response.data) {
                if (!reporter.agencyId) continue
                let reporterCount = 1
                for (let reporter_2 of response.data) {
                    if (!reporter_2.agencyId) continue
                    if (reporter.agencyId == reporter_2.agencyId && reporter_2.id != reporter.id) {
                        reporterCount++;
                    }
                }
                map.set(reporter.agencyId, reporterCount)

            }
            setMap({ currrentReporterCountMap: map })
        }
        fetchMyAPI()
    }, []);

    if (reporterCountMap.currrentReporterCountMap) {
        return (
            <div>
                <ResultsContext.Provider value={reporterCountMap.currrentReporterCountMap}>
                    <Display />
                </ResultsContext.Provider>

            </div>
        )
    } else {
        return (
            <div>
                Loading
            </div>)
    }
}


function Display() {

    const reportersCountMap = useContext(ResultsContext);
    const initialState = {
        currrentReporterCountMap: reportersCountMap
    }

    const [reporterCountMap, setMap] = useState(initialState)

    useEffect(() => {
        axios.get("https://localhost:44307/api/Agencies")
            .then(response => {
                if (reportersCountMap) {
                    for (let agency of response.data) {
                        if (reportersCountMap.get(agency.id)) {
                            let val = reportersCountMap.get(agency.id)
                            reportersCountMap.delete(agency.id)
                            reportersCountMap.set(agency.name, val)
                        }else{
                            reportersCountMap.set(agency.name, 0)
                        }
                    }
                }
                console.log("insdi")
                console.log(reportersCountMap)
                setMap({ currrentReporterCountMap: reportersCountMap })

            }).catch(e => { console.log(e); })


    }, []);

    return <div>
        <h2>Reporter Count per Agency</h2>

        {
            [...reporterCountMap.currrentReporterCountMap].map(([name, value]) => ({ name, value })).map((element, idx) => {

                return <div key={idx}>{element.name}: {element.value} Reporters</div>
            })
        }
    </div>

}