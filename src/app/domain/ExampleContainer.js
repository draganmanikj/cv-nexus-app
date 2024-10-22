import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExampleComponent from "./ExampleComponent";

function ExampleContainer(props) {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(undefined); //undefined == none, {} == new
  // const { items, loadingItems } = useSelector((state) => state.example);

  function saveItem(item) {
    // if (item.id) {
    //   setSelectedItem(undefined);
    //   dispatch(operations.updateItem(item));
    // }
    // else dispatch(operations.createItem(item));
  }
  function deleteItem(item) {
    // dispatch(operations.deleteItem(item));
  }
  function fetchItems(item) {
    // dispatch(operations.fetchItems(item));
  }
  function reset() {
    // dispatch(operations.resetReducer());
  }

  return (
      <div>hello</div>
  );
}

export default ExampleContainer;
