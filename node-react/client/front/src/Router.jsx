import { useState, useEffect } from "react"
import MyForm from "./MyForm"
import Table from "./Table"
import "./app.css";



function Router() {
  const [userList, setUserList] = useState([])
  const [show, setShow] = useState(false)
  const [hide, setHide] = useState(false)
  const [popShow, setPopshow] = useState(false)

  const loadData = () => {
    const url = 'http://localhost:5000/api/user'
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data, "data")
        setUserList(data)
      }).catch(err => {
        console.log('APP18', err);
      })
  }
  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="App">
      <br></br>
      <button className="noselect" onClick={() => {
        setShow(true)
        setHide(false)
        setPopshow(false)
      }}>
        <span className='text'>Add</span><span className="icon">+</span></button>
      {show && (
        <MyForm loadData={loadData}
          setShow={setShow} />
      )}
      <Table
        setShow={setShow}
        userList={userList}
        loadData={loadData}
        hide={hide}
        setHide={setHide}
        popShow={popShow}
        setPopshow={setPopshow}
      />
    </div >
  );
}

export default Router