import { useState } from "react";
import { useForm } from "react-hook-form";
import "./myform.css";
function MyForm({ loadData, setShow }) {
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [phone, setPhone] = useState();
  const [date, setDate] = useState();
  const [mail, setMail] = useState("");
  const [throwError, setThrowError] = useState(false);
  const { handleSubmit, register } = useForm();
  const onSubmit = () => {
    if (isNaN(phone)) {
      setThrowError(true);
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
          setShow(false);
        })
        .catch((err) => console.log(err.data));
    }
  };
  return (
    <div className="behind">
      <div className="container left">
        <div>
          <span id="spanupdate">Add User</span>
          <i
            className="fa-solid fa-xmark x"
            onClick={() => {
              setShow(false);
            }}
          ></i>
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
               {throwError &&(
              <div id="fillthegaps">Please enter number</div>
            )}
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
                onChange={(e) => setMail(e.target.value)}
                required
              ></input>
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>E-mail*</label>
            </div>
            <button className="acceptbtn">Add</button>
            <button
              className="acceptbtn"
              onClick={() => {
                setShow(false);
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
export default MyForm;
