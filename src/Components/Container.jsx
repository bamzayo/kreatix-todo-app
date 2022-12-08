import React, { useEffect, useCallback, useState, useMemo } from "react";
import Empty from "./Empty";
import Loader from "./Loader";
import ListItem from "../Components/ListItem";
import { db } from "../firebase";
import { onSnapshot, collection } from "firebase/firestore";

const Container = ({
  showModal,
  loading,
  handleError,
  setPreSet,
  setPreSetData,
  toggleModal,
  setLoading,
}) => {
  const collectionRef = useMemo(() => collection(db, "todo"), []);
  const [list, setList] = useState([]);

  const openModalWithData = (data) => {
    setPreSet(true);
    setPreSetData(data);
    toggleModal();
  };

  const openModal = () => {
    setPreSet(false);
    setPreSetData({});
    toggleModal();
  };

  const handleRenderList = (item, index) => {
    return (
      <ListItem
        handleEditItem={openModalWithData}
        handleError={handleError}
        key={index}
        item={item}
      />
    );
  };
  const fetchList = useCallback(async () => {
    let clear;
    try {
      setLoading(true);
      clear = onSnapshot(collectionRef, (snapshot) => {
        const items = [];
        snapshot.forEach((item, index) => {
          items.push({
            ...item.data(),
          });
        });
        setList(items);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      handleError("error fetching items, please try again later");
    }
    return () => clear();
  }, [collectionRef, handleError, setLoading]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <div className="rounded-2xl bg-gray-100 pb-10">
      <div className="border-b py-8 px-8 flex-col md:flex-row flex items-center justify-between border-slate-400 border-solid ">
        <h2 className=" sm:text-l  md:text-3xl md:mt-2 text-l font-semibold">
          Todo List
        </h2>
        {!showModal && (
          <div onClick={openModal} className="btn">
            Add Todo
          </div>
        )}
      </div>
      {loading || loading === null ? (
        <Loader />
      ) : list.length < 1 ? (
        <Empty />
      ) : (
        list.map(handleRenderList)
      )}
    </div>
  );
};

export default Container;
