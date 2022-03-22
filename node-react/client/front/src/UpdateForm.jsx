import React, { useState } from "react";
import "./updateform.css";
import { useForm } from "react-hook-form";

function UpdateForm({ loadData, idHolder, data, setHide }) {
  const [name, setName] = useState(data.ad);
  const [surname, setSurname] = useState(data.soyad);
  const [phone, setPhone] = useState(data.pnumber);
  const [date, setDate] = useState(data.dtarih);
  const [mail, setMail] = useState(data.eposta);
  const [throwerror, setThrowError] = useState(false);
  const { handleSubmit, register } = useForm();

  const onSubmit = (e) => {
    if (
      name === "" ||
      surname === "" ||
      isNaN(phone) ||
      date === "" ||
      mail === ""
    ) {
      setThrowError(true);
    } else {
      setThrowError(false);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const phonenumber = parseInt(phone);
      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify({
          name,
          surname,
          phonenumber,
          date,
          mail,
        }),
        redirect: "follow",
      };
      const callbackFunction1 = (result) => console.log(result);
      const callbackFunction2 = () => {
        loadData();
        setHide(false);
      };

      fetch("http://localhost:5000/api/user/" + idHolder, requestOptions)
        .then((response) => response.json())
        .then(callbackFunction1)
        .finally(callbackFunction2)
        .catch((error) => console.log("error", error));
    }
  };
  return (
    <div className="behind">
      <div className="update container">
        <div>
          <i
            className="fa-solid fa-xmark x"
            onClick={() => {
              setHide(false);
            }}
          ></i>
          <span id="spanupdate">Update Data</span>
        </div>
        <hr></hr>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="update-data">
            <div className="group">
              <input
                type="text"
                placeholder="Name"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
                required
              ></input>
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Name</label>
            </div>
            <div className="group">
              <input
                type="text"
                placeholder="Surname"
                value={surname}
                name="surname"
                onChange={(e) => setSurname(e.target.value)}
                required
              ></input>
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Surname</label>
            </div>
            <div className="group">
              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                required
              ></input>
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Phone Number</label>
              {throwerror && <div id="fillthegaps">Please enter a number.</div>}
            </div>
            <div className="group">
              <input
                type="text"
                placeholder="Date of birth"
                value={date}
                name="date"
                onChange={(e) => setDate(e.target.value)}
                required
              ></input>
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Date of birth</label>
            </div>
            <div className="group">
              <input
                type="text"
                placeholder="E-mail"
                name="mail"
                value={mail}
                {...register("email", {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  },
                })}
                onChange={(e) => {
                  setMail(e.target.value);
                }}
                required
              ></input>
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>E-mail</label>
            </div>
            <button className="acceptbtn">
              Update
            </button>
            <button
              className="acceptbtn"
              onClick={(e) => {
                setHide(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateForm;
