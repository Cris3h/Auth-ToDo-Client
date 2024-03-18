import { useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import Modal from "./Modal";

import "../app/globals.css";

const ListHeader = ({ listName, getData }) => {
  const [showModal, setShowModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const router = useRouter();


  const signOut = () => {
    removeCookie("Email");
    removeCookie("AuthToken");
  };

  return (
    <div className="list-header">
      <h1>{listName}</h1>

      <div className="btn-container">

        <button className="create" onClick={() => setShowModal(true)}>
          ADD NEW
        </button>

        <button className="signout" onClick={() => signOut()}>
          Sign Out
        </button>
      </div>

      {showModal && (
        <Modal mode={"create"} setShowModal={setShowModal} getData={getData} />
      )}
    </div>
  );
};

export default ListHeader;
