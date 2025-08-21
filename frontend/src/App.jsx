import React, { useState } from "react";
import "./App.css";

function App() {
  const [array, setArray] = useState([]);
  const [showInput, setShowInput] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [extraValue, setExtraValue] = useState("");
  const [message, setMessage] = useState("");

  const handleAction = (action) => {
    setShowInput(action);
    setInputValue("");
    setExtraValue("");
    setMessage("");
  };

  const addElement = () => {
    if (inputValue === "") return;
    setArray((prev) => [...prev, parseInt(inputValue, 10)]);
    setMessage(`Added ${inputValue}`);
    setInputValue("");
    setShowInput(null);
  };

  const deleteElement = () => {
    if (!inputValue) return;
    const num = parseInt(inputValue, 10);

    if (array.includes(num)) {
      setArray(array.filter((el) => el !== num));
      setMessage(`Deleted element: ${num}`);
    } else {
      setMessage(`Element ${num} not found`);
    }

    setInputValue("");
    setShowInput(null);
  };

  const insertElement = () => {
    if (inputValue === "" || extraValue === "") return;
    const val = parseInt(inputValue, 10);
    const pos = parseInt(extraValue, 10);
    let newArray = [...array];
    if (isNaN(pos) || pos < 0 || pos > newArray.length) {
      setMessage("Invalid position");
      return;
    }
    newArray.splice(pos, 0, val);
    setArray(newArray);
    setMessage(`Inserted ${val} at position ${pos}`);
    setInputValue("");
    setExtraValue("");
    setShowInput(null);
  };

  const searchElement = () => {
    if (inputValue === "") return;
    const val = parseInt(inputValue, 10);
    const index = array.indexOf(val);
    if (index !== -1) {
      setMessage(`Found ${val} at index ${index}`);
    } else {
      setMessage(`${val} not found`);
    }
    setInputValue("");
    setShowInput(null);
  };

  const updateElement = () => {
    if (inputValue === "" || extraValue === "") return;
    const newVal = parseInt(inputValue, 10);
    const oldVal = parseInt(extraValue, 10);
    const idx = array.indexOf(oldVal);
    if (idx !== -1) {
      const newArray = [...array];
      newArray[idx] = newVal;
      setArray(newArray);
      setMessage(`Updated ${oldVal} → ${newVal}`);
    } else {
      setMessage(`${oldVal} not found`);
    }
    setInputValue("");
    setExtraValue("");
    setShowInput(null);
  };

  const getSize = () => {
    setMessage(`Array size is ${array.length}`);
    setShowInput(null);
  };

  return (
    <div className="app">
      <h1>ARRAY VISUALIZER</h1>

      {/* Array Display */}
      <div className="array-container">
        {array.map((num, index) => (
          <div key={index} className="array-box">
            {num}
          </div>
        ))}
        {array.length === 0 && (
          <div className="array-empty">Array is empty — add elements below</div>
        )}
      </div>

      {/* Buttons */}
      <div className="buttons">
        <button onClick={() => handleAction("add")}>Add Element</button>
        <button onClick={() => handleAction("delete")}>Delete Element</button>
        <button onClick={() => handleAction("insert")}>Insert Element</button>
        <button onClick={() => handleAction("search")}>Search Element</button>
        <button onClick={() => handleAction("update")}>Update Element</button>
        <button onClick={getSize}>Array Size</button>
      </div>

      {/* Inputs */}
      <div className="input-area">
        {showInput === "add" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addElement();
            }}
          >
            <input
              autoFocus
              type="number"
              value={inputValue}
              placeholder="Enter element to add"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        )}

        {showInput === "delete" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              deleteElement();
            }}
          >
            <input
              autoFocus
              type="number"
              value={inputValue}
              placeholder="Enter element to delete"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        )}

        {showInput === "insert" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              insertElement();
            }}
          >
            <input
              autoFocus
              type="number"
              value={inputValue}
              placeholder="Enter element"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <input
              type="number"
              value={extraValue}
              placeholder="Enter position (0..n)"
              onChange={(e) => setExtraValue(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        )}

        {showInput === "search" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              searchElement();
            }}
          >
            <input
              autoFocus
              type="number"
              value={inputValue}
              placeholder="Enter element to search"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        )}

        {showInput === "update" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateElement();
            }}
          >
            <input
              autoFocus
              type="number"
              value={extraValue}
              placeholder="Enter old value"
              onChange={(e) => setExtraValue(e.target.value)}
            />
            <input
              type="number"
              value={inputValue}
              placeholder="Enter new value"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </div>

      {/* Output Message */}
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default App;
