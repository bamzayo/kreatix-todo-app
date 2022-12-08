import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi";
import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";

const ListItem = ({ item, handleError, handleEditItem }) => {
  const { description, text, id } = item;
  const documentRef = doc(db, "todo", id);

  const handleDeleteItem = async () => {
    try {
      deleteDoc(documentRef);
    } catch (error) {
      handleError("Error fetching Todo items. Please try again later");
    }
  };
  return (
    <div className="px-8 ">
      <div className="border-b pb-4 pt-6 flex justify-between border-slate-400 border-solid ">
        <div>
          <h3 className="text-xl font-semibold capitalize ">{text}</h3>
          <p className="text-l font-extralight mt-2">{description}</p>
        </div>
        <div>
          <AiOutlineDelete
            onClick={handleDeleteItem}
            style={{ marginBottom: "10px" }}
            size={20}
            color="red"
          />
          <HiOutlinePencil
            onClick={() => handleEditItem(item)}
            size={20}
            color="#672ee4"
          />
        </div>
      </div>
    </div>
  );
};

export default ListItem;
