import { useState } from "react";
import { useForm } from "react-hook-form";
import "./myform.css";
function MyForm({ loadData, setShow }) {
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [phone, setPhone] = useState();
  const [date, setDate] = useState();
  const [mail, setMail] = useState();
  const [eror, setEror] = useState(false);
  const { handleSubmit, register } = useForm();
  const onSubmit = (e) => {
    console.log(mail);
    if (
      name === undefined &&
      surname === undefined &&
      phone === undefined &&
      date === undefined &&
      mail === undefined
    ) {
      setEror(true);
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, surname, phone, date, mail }),
      };
      const url = "http://localhost:5000/api/user";
      fetch(url, requestOptions)
        .then((res) => res.json())
        .finally(() => {
          loadData();
          setEror(false);
        })
        .catch((err) => console.log(err.data));
    }
  };
  return (
    <div className="behind">
      <div className="container left">
        <div>
          <span id="span">Add User</span>
          <h2
            id="h-tag"
            onClick={() => {
              setShow(false);
            }}
          >
            X
          </h2>
        </div>
        <hr className="line" />
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="update-data">
            <div className="group">
              <input
                type="text"
                placeholder="Name*"
                name="name"
                onChange={(e) => setName(e.target.value)}
                required
              ></input>
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Name*</label>
            </div>
            <div className="group">
              <input
                type="text"
                placeholder="Surname*"
                name="surname"
                onChange={(e) => setSurname(e.target.value)}
                required
              ></input>
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Surname*</label>
            </div>
            <div className="group">
              <input
                type="text"
                placeholder="Phone Number*"
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                required
              ></input>
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Phone Number*</label>
            </div>

            <div className="group">
              <input
                type="text"
                placeholder="Date time*"
                name="date"
                onChange={(e) => setDate(e.target.value)}
                required
              ></input>
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Date time*</label>
            </div>
            <div className="group">
              <input
                type="text"
                placeholder="E-mail*"
                name="email"
                {...register("email", {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  },
                })}
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                required
              ></input>
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>E-mail*</label>
              {eror && <span id="eror">Please fill the gaps</span>}
            </div>
            <button className="updatebtn">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MyForm;
