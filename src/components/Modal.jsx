import { useState } from "react";
import { useCookies } from "react-cookie";

import "@/app/globals.css";

const Modal = ({ mode, setShowModal, getData, task }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);

  //falsey from ListHeader, truthy from ListItems
  const editMode = mode === "edit" ? true : false;

  const [data, setData] = useState({
    // user_email: editMode ? task.user_email : cookies.Email,
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date(),
  });

  //  HANDLERS :
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/todos/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        setShowModal(false);
        getData();
      }
    } catch (error) {}
  };

  const putData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/todos/${task._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        setShowModal(false);
        getData();
      } else {
        alert('Something went wrong. Please refresh the page and try again!')

      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3> Let's {mode} your task </h3>
          <button className="" onClick={() => setShowModal(false)}>
            X
          </button>
        </div>

        <form>
          <input
            required
            maxLength={30}
            placeholder="write your task here"
            name="title"
            value={data.title || ""}
            onChange={handleChange}
          />

          <br />
          <label htmlFor="range">Drag to select your current progress</label>
          <input
            required
            className="progress-input"
            type="range"
            id="range"
            min="0"
            max="100"
            name="progress"
            value={data.progress || ""}
            onChange={handleChange}
          />
          <input
            className={mode}
            type="submit"
            onClick={editMode ? putData : postData}
            value="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
