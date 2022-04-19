import axios from 'axios';
import React, { useState } from 'react'

export default function CreateAgency() {

    const initialState = {
        agency: {
            name: "",
            establishmentYear: 0
        },
        resultMessage: ""
    }

    const [state, setSt] = useState(initialState)

    const handleChange = (evt) => {
        let { name, value } = evt.target;
        setSt({ ...state, agency: { ...state.agency, [name]: value } })
        console.log(state)
    }

    const createAgency = (evt) => {

        for (const [key, value] of Object.entries(state.agency)) {

            if (!value) {
                setSt(
                    { ...state, resultMessage:"Do not leave " + key + " empty" }

                )
                return
            }

        }


        axios("https://localhost:44307/api/Agencies/",
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                data: state.agency
            }
        ).then(response => {
            setSt(
                {
                    agency: {},
                    resultMessage: response.statusText
                }
            )

        })
            .catch(e => {
                setSt(
                    {
                        ...state,
                        resultMessage: e.message
                    }

                )
            })

    }


    return (
        <div>  <h2>Add Agency</h2>
            <div>
                <p>
                    <label>
                        Name<br />
                        <input type="text" name="name" onChange={handleChange}></input>
                    </label>
                </p>

                <p>
                    <label>
                        Establishment Year <br />
                        <input type="number" name="establishmentYear" onChange={handleChange}></input>
                    </label>
                </p>
                <p>
                    <button onClick={createAgency}>
                        Create Agency
                    </button>
                </p>
                <p>{state.resultMessage}</p>
            </div>
        </div>
    )
}
