import React, { useState, useEffect } from 'react'
import img2 from './largest-vaccine-banner.jpg'
import './mainpage.css'
import { Link } from 'react-router-dom'


const Tablepage = (props) => {
    const [centers, setCenter] = useState([]);
    // const [searchsession, setSearchSession] = useState([])
    // const [pincode, setPincode] = useState('')

    let today = new Date();
    let date = ('0' + today.getDate()).slice(-2)
    let month = ('0' + (today.getMonth() + 1)).slice(-2)
    let year = today.getFullYear()
    let todayDate = `${date}-${month}-${year}`
    const [dateVal, setDate] = useState(todayDate)

    const loadSession = () => {
        fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${props.pincode}&date=${dateVal}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setCenter(result.centers);
                }
            )
        console.log(dateVal)

    }
    useEffect(() => {
        loadSession();
    }, [])

    // const onSubmit = async (e) => {
    //     e.preventDefault()
    //     setPincode(searchsession)
    //     console.log(searchsession)
    // }
    const refresh = () => {
        window.location.reload()
    }
    return (

        <div>

            <div className="position-relative container mt-2" id="tablepageDiv">
                <button className="btn btn-outline-dark d-inline-flex mt-4 p-2 d-flex justify-content-end" onClick={refresh}>Back to Home</button>
                <div id="availButtons">
                    
                    <button className="btn btn-danger mr-1 mt-2 mb-2 p-1">NOT AVAILABLE</button>
                    <button className="btn btn-success mr-1 mt-2 mb-2 p-1">AVAILABLE</button>
                </div>
                <img src={img2} className=" position-absolute text-center p-3" id="img2"/>
                <div className="d-inline-block alert alert-info" role="alert">
                    Showing results for pincode-<span class="badge bg-light text-dark">{props.pincode}</span>
                </div>
                <table className="table border shadow table-bordered table-hover table-responsive">
                    <thead className="thead-dark">
                        <tr>
                            <th className="w-25" id="pehlacol">Centre Name</th>
                            <th >Availability</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(centers).length === 0 ? <tr><th>No centers available now!</th><th>Check back later or try different pincode</th></tr> :
                            centers.map((center, index) => (
                                <tr>

                                    <th id="fix">{center.name}<br/>
                                        <span className="font-weight-lighter">{center.address}, {center.district_name}, {center.state_name}</span>
                                        <span class="badge rounded-pill bg-info text-dark ml-1">{center.fee_type}</span></th>
                                    <td>
                                        {center.sessions.map((session, index) => (
                                            <td><tr className="" ><span className="badge badge-secondary m-1 p-2">{session.date}</span></tr>
                                                <tr className="d-flex" ><span className="badge badge-primary m-1 p-2">{session.vaccine}</span><span className="badge badge-dark m-1 p-2">Age-{session.min_age_limit}+</span></tr>
                                                <tr>{session.available_capacity_dose1 > 0 ? <div className="d-flex"><button className="btn btn-success m-1 p-1">Dose1 :{session.available_capacity_dose1}</button><a href="https://selfregistration.cowin.gov.in/" target="_blank" className="btn btn-warning m-1 p-1">Book Slot</a></div> : <button className="btn btn-danger m-1 p-1">Dose1 :{session.available_capacity_dose1}</button>}
                                                    {session.available_capacity_dose2 > 0 ? <div className="d-flex"><button className="btn btn-success m-1 p-1">Dose2 :{session.available_capacity_dose2}</button><a href="https://selfregistration.cowin.gov.in/" target="_blank" className="btn btn-warning m-1 p-1">Book Slot</a></div> : <button className="btn btn-danger m-1 p-1">Dose2 :{session.available_capacity_dose2}</button>}
                                                </tr>
                                            </td>
                                        ))}
                                    </td>


                                </tr>
                            ))

                        }

                    </tbody>
                </table>
            </div>


        </div>

    )
}
export default Tablepage;