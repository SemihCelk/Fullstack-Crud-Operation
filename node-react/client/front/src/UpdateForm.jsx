import React, { useState } from 'react'
import "./updateform.css";

function UpdateForm({ indexHolder, loadData, idHolder, data, setHide }) {
    const [name, setName] = useState(data.ad)
    const [surname, setSurname] = useState(data.soyad)
    const [phone, setPhone] = useState(data.pnumber)
    const [date, setDate] = useState(data.dtarih)
    const [mail, setMail] = useState(data.eposta)
    const [eror,setEror]=useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        if (name === undefined && surname === undefined && phone === undefined && date === undefined && mail === undefined){
            setEror(true)
        }
        else{
        console.log(indexHolder, "updatecomp")
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        const b = parseInt(phone)

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify({
                name, surname,b,date,mail
            }),
            redirect: 'follow'
        };
        const callbackFunction1 = result => console.log(result)
        const callbackFunction2 = () => {
            loadData()
            setHide(false)
        }
        
        fetch("http://localhost:5000/api/user/" + idHolder, requestOptions)
            .then(response => response.json())
            .then(callbackFunction1)
            .finally(callbackFunction2)
            .catch(error => console.log('error', error));
        }
    }
    return (
        <div className='behind'>
            <div className="update container">
                <div>
                    <h2 id='h-tag' onClick={() => {
                        setHide(false)
                    }}>X</h2>
                    <span id="span">Update Data</span>
                </div>
                <hr></hr>
                <form className='form'  onSubmit={onSubmit}>
                    <div className='update-data'>
                        <div className='group'>
                            <input type="text" placeholder='Name' value={name} name='name' onChange={e => setName(e.target.value)} required></input>
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Name</label>
                        </div>
                        <div className='group'>
                            <input type="text" placeholder='Surname' value={surname} name='surname' onChange={e => setSurname(e.target.value)} required></input>
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Surname</label>
                        </div>
                        <div className='group'>


                            <input type="text" placeholder='Phone Number' value={phone} name='phone' onChange={e => setPhone(e.target.value)} required></input>
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Phone Number</label>
                        </div>

                        <div className='group'>

                            <input type="text" placeholder='Date time' value={date} name='date' onChange={e => setDate(e.target.value)} required></input>
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Date time</label>
                        </div>
                        <div className='group'>

                            <input type="text" placeholder='E-mail' name='mail' value={mail} onChange={e =>{
                                setMail(e.target.value)
                        }}
                            required></input>
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>E-mail</label>
                            {eror &&(
                        <span id='eror'>Please fill the gaps</span>
                        )}
                        </div>

                        <button className='updatebtn'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateForm