import { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

function AppointmentForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [data, setadata] = useState([]);

  useEffect(() => getdata, []);

  const getdata = () => {
    axios
      .get("https://jwgvze-4000.csb.app/users/a")
      .then((response) => {
        setadata(response.data);
      })
      .catch((err) => console.log(err));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { name, email, phone };
    axios
      .post("https://jwgvze-4000.csb.app/users", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Appointment submitted successfully!", response);
        setMessage("Appointment submitted successfully!");
        getdata();
        setEmail("");
        setName("");
        setPhone("");
      })
      .catch((error) => {
        console.log(
          "Error submitting appointment. Please try again later.",
          error
        );
        setMessage("Error");
      });
  };

  const handelDelete = (id) => {
    axios
      .delete(`https://jwgvze-4000.csb.app/users/delete/${id}`)
      .then((response) => {
        console.log(response);
        setMessage("delete sucess");
        getdata();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <br />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <br />
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
          <br />
          <button type="submit">Submit</button>
          <br />
        </form>
        {message && <p>{message}</p>}
      </div>
      {data &&
        (console.log(data),
        (
          <div className="list-container">
            <ul>
              {data.map((user) => (
                <li key={user.id}>
                  <p>unique ID: {user.id}</p>
                  <p>Name: {user.name}</p>
                  <p>Email: {user.email}</p>
                  <p>Phone: {user.phone}</p>
                  <button onClick={() => handelDelete(user.id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </>
  );
}

export default AppointmentForm;
