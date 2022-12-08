import React, { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc, collection, updateDoc } from "firebase/firestore";
import loader from "../assets/loader.gif";
const Modal = ({
  closeModal,
  handleError,
  handleSuccess,
  preSet,
  preSetData,
}) => {
  const { text: oldTest, description: oldDescription } = preSetData;
  const [text, setText] = useState(oldTest ? oldTest : "");
  const [description, setDescription] = useState(
    oldDescription ? oldDescription : ""
  );
  const [loading, setLoading] = useState(false);

  const collectionRef = collection(db, "todo");
  const handleTextChange = (event) => {
    setText(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);

    if (text.length < 1 || description.length < 1) {
      setLoading(false);
      return handleError("All fields are required");
    }
    const id = Math.random().toString(16).slice(2);
    const data = {
      text,
      description,
      id: id,
    };
    try {
      if (preSet) {
        const docref = doc(collectionRef, preSetData?.id);
        await updateDoc(docref, {
          text,
          description,
        });
      } else {
        const docref = doc(collectionRef, `${id}`);
        await setDoc(docref, data);
      }
      setLoading(false);
      handleSuccess("Todo added successfully");
      closeModal();
    } catch (error) {
      setLoading(false);
      handleError("Error adding todo. Please try again later");
    }
  };

  return (
    <>
      <div
        className="bg-gray-200 bg-opacity-25 w-full fixed left-0 bottom-0 h-screen"
        onClick={closeModal}
      ></div>
      <div className="w-full fixed left-0 bottom-0">
        <div className="w-6/12 py-6 opacity-100 px-8 mx-auto mb-20 rounded-2xl bg-white">
          <form className="form" onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                className="text-input"
                id="text-input"
                type="text"
                value={text}
                onChange={handleTextChange}
              />
            </label>
            <label>
              Description:
              <textarea
                rows="2"
                className="text-area"
                onChange={handleDescriptionChange}
                value={description}
              />
            </label>
            <div className="btns">
              <input
                onClick={closeModal}
                className="btn outline"
                type="button"
                value="Cancel"
              />
              <button type="submit" className="btn">
                {loading ? (
                  <div className=" w-6 h-6 overflow-hidden rounded-2xl ">
                    <img
                      className="w-full object-cover rounded-full h-full"
                      alt="gif"
                      src={loader}
                    />
                  </div>
                ) : preSet ? (
                  "Update Todo"
                ) : (
                  "Add Todo"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
