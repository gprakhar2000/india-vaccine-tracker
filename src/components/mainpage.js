import React, { useState, useEffect } from 'react'
import img1 from './flag2.png'
import './mainpage.css'
import Tablepage from './tablepage';



const Mainpage = (props) => {
    const [searchsession, setSearchSession] = useState('')
    const [pincode, setPincode] = useState('')

    const onSubmithandler = (e, searchsession) => {
        e.preventDefault()
        setPincode(prevpincode => prevpincode = searchsession)
        console.log(pincode)

    }
    if (pincode) {
        return <Tablepage pincode={pincode} />
    }
    else return (
        
        <div className="flag" id="mainpageDiv">
            <div className="stripe saffron"></div>
            <div className="stripe py-2 text-center">
                <div className="m-2 text-center">
                    <div className="d-inline-flex border border-dark" id="headingdiv"><img src={img1} className=" d-inline-block text-center rounded-pill" id="image" /><h2 className="p-2">INDIA <span className="badge badge-primary">Vaccine Tracker</span></h2></div>
                </div>
                <form className="text-center" onSubmit={e => onSubmithandler(e, searchsession)}>
                    <input id="pincode" className="" type="text" placeholder="Enter PinCode.."
                        autoFocus required pattern="[1-9][0-9]{5}" onInvalid={e=>{e.target.setCustomValidity('Please enter valid pincode')}} onInput={e=>{e.target.setCustomValidity('')}} onChange={event => { setSearchSession(event.target.value) }}
                    />
                    
                    <button type="submit" className="btn btn-outline-dark" id="submit">Submit</button>
                </form>
            </div>
            <div className="stripe green"></div>
        </div>



    )
}
export default Mainpage;