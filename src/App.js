import React, { useCallback, useState } from "react";
import Modal from "./Components/Modal";
import Toast from "./Components/Toast";
import Container from "./Components/Container";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(null);
  const [preSet, setPreSet] = useState(false);
  const [preSetData, setPreSetData] = useState({});
  const handleError = useCallback((msg) => {
    setToast({ msg, type: "error" });
    setTimeout(() => {
      setToast(null);
    }, 2000);
  }, []);
  const handleSuccess = useCallback((msg) => {
    setToast({ msg, type: "success" });
    setTimeout(() => {
      setToast(null);
    }, 2000);
  }, []);

  const toggleModal = useCallback(() => {
    setShowModal((prev) => !prev);
  }, []);

  return (
    <>
      <div className="w-6/12 min-h-max mt-20 m-auto px-8 ">
        {toast && <Toast toast={toast} />}

        <Container
          showModal={showModal}
          handleError={handleError}
          loading={loading}
          setPreSet={setPreSet}
          setPreSetData={setPreSetData}
          toggleModal={toggleModal}
          setLoading={setLoading}
        />
      </div>
      {showModal && (
        <Modal
          handleSuccess={handleSuccess}
          preSet={preSet}
          preSetData={preSetData}
          handleError={handleError}
          closeModal={toggleModal}
        />
      )}
    </>
  );
}

export default App;
