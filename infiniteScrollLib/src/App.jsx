import { useState, useEffect, useRef } from "react";
import axios from "axios";
import FileInputSearch from "./components/FileInputSearch";
import RowVirtualizer from "./components/RowVirtualizer";
import Fuse from "fuse.js";
import "./app.css";

/**
 * App Component
 * @returns {JSX.Element} - Rendered component
 */

export default function App() {
  const [dataSource, setDataSource] = useState([]);
  const [wordSearch, setWordSearch] = useState("");
  const [countOutView, setCountOutView] = useState({ above: 0, below: 0 });
  const [currentItems, setCurrentItems] = useState([]);
  const [virtualizer, setVirtualizer] = useState(null);
  const parentRef = useRef(null);

  // Initializing fuzzy searching object
  const fuse = new Fuse(dataSource, {
    includeScore: true,
    threshold: 0.1,
    sortFn: (a, b) => {
      a.refIndex - b.refIndex;
    },
  });
  const result = fuse.search(wordSearch);

  // Fetching txt file from back-end
  useEffect(() => {
    axios({ method: "GET", url: "http://localhost:8001/get-file" }).then(
      (res) => {
        const lines = res.data.split("\n");
        setDataSource(lines);
      },
    );
  }, []);

  // Handling user typing in search box
  const handleClick = ({ currentTarget = {} }) => {
    let { value } = currentTarget;
    value = value.replace(/\\/g, "").replace(/([\^$.*+?()[\]{}|])/g, "\\$1");
    setWordSearch(value);
  };

  // Calculating occurrences searched term above and below viewport
  useEffect(() => {
    const above = result.filter(
      (result) => result.refIndex < currentItems[0].index,
    ).length;
    const below = result.filter(
      (result) => result.refIndex > currentItems[currentItems.length - 1].index,
    ).length;
    setCountOutView({ above, below });
  }, [currentItems, wordSearch]);

  //Scroll to next occurrences
  const handleNext = () => {
    const currentLastIndex = currentItems[currentItems.length - 1].index;
    const nextIndex = result.findIndex(
      (item) => item.refIndex > currentLastIndex,
    );
    if (nextIndex !== -1) {
      virtualizer.scrollToIndex(result[nextIndex].refIndex, {
        align: "start",
        smoothScroll: true,
      });
    }
  };

  //Scroll to previous occurrences
  const handlePrev = () => {
    const currentFirstIndex = currentItems[0].index;
    const prevIndex = result
      .slice()
      .reverse()
      .findIndex((item) => item.refIndex < currentFirstIndex);
    if (prevIndex !== -1) {
      virtualizer.scrollToIndex(
        result[result.length - 1 - prevIndex].refIndex,
        { align: "start", smoothScroll: true },
      );
    }
  };

  return (
    <>
      <FileInputSearch
        handleClick={handleClick}
        highlightedWords={wordSearch}
        countOutView={countOutView}
        wordSearch={wordSearch}
        handleNext={handleNext}
        handlePrev={handlePrev}
      ></FileInputSearch>
      <RowVirtualizer
        dataSource={dataSource}
        reference={parentRef}
        wordSearch={wordSearch}
        setCurrentItems={setCurrentItems}
        setRowVirtualizer={setVirtualizer}
      ></RowVirtualizer>
    </>
  );
}
