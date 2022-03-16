import React, { useState } from 'react'
import UpdateForm from './UpdateForm';
import "./table.css";

function Table({ userList, loadData, setPopshow, popShow, setHide, hide, setShow }) {
    const [indexHolder, setIndexHolder] = useState()
    const [idHolder, setIdHolder] = useState()
    const [data, setData] = useState([])
    const [yesdel, setYesdel] = useState()

    const deleteAllList = () => {
        const raw = "";

        const requestOptions = {
            method: 'DELETE',
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/api/user", requestOptions)
            .then(response => response.json())
            .finally(loadData)
            .finally(setYesdel(false))
            .catch(error => console.log('error', error));
    }
    const singleDelete = () => {
        const requestOptions = {
            method: 'DELETE',
        };
        const link = "http://localhost:5000/api/user/" + idHolder;
        fetch(link, requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .finally(setPopshow(false))
            .finally(loadData)
            .catch(error => console.log('error', error));
    }
    return (
        <div className='main-div'>
            <button className="delBTN" onClick={() => {
                setYesdel(true)
                setPopshow(false)
                setShow(false)
            }}><span className='text' >Delete All</span><span className="icon">x</span></button>
            {popShow && (
                <div className='pop-up-top'>
                    <div className='pop-up'>
                        <span id="spanX" onClick={() => {
                            setPopshow(false)
                            setShow(false)
                        }}>X</span>
                        <br></br>
                        <div id='pop-up-text'>Are you sure you want to delete this user?</div>
                        <div className='sub-pop'>
                            <button className='yes-nobtn' onClick={singleDelete}>Yes</button>
                            <button className='yes-nobtn' onClick={() => {
                                setPopshow(false)
                                setShow(false)
                            }}>No</button>
                        </div>
                    </div>
                </div>
            )}
            {yesdel && (
                <div className='pop-up-top'>
                    <div className='pop-up'>
                        <span id="spanX" onClick={() => {
                             setYesdel(false)
                             setShow(false)
                        }}>X</span>
                        <br></br>
                        <div id='pop-up-text'>Are you sure you want to delete all?</div>
                        <div className='sub-pop'>
                            <button className='yes-nobtn' onClick={deleteAllList}>Yes</button>
                            <button className='yes-nobtn' onClick={() => {
                                setYesdel(false)
                                setShow(false)
                            }}>No</button>
                        </div>
                    </div>
                </div>

            )}
            <div>
                {hide && (<UpdateForm indexHolder={indexHolder}
                    idHolder={idHolder}
                    loadData={loadData}
                    data={data}
                    setHide={setHide} />)}
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Number</th>
                            <th>Mail Adress</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((user, i) => {
                            return (
                                <tr key={i}>
                                    <td>{user.id}</td>
                                    <td>{user.ad}</td>
                                    <td>{user.soyad}</td>
                                    <td>{user.pnumber}</td>
                                    <td>{user.eposta}</td>
                                    <td><i className="fa-solid fa-pen-to-square edit" onClick={() => {
                                        setIndexHolder(i)
                                        setIdHolder(user.id)
                                        setHide(true)
                                        setData(user)
                                        setPopshow(false)
                                        setShow(false)
                                    }}></i>
                                    </td>
                                    <td>
                                        <i className="fa-solid fa-trash dustbin" onClick={() => {
                                            setIndexHolder(i)
                                            setIdHolder(user.id)
                                            setPopshow(!popShow)
                                            setHide(false)
                                            setShow(false)
                                        }}></i>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>

    )
}
export default Table 