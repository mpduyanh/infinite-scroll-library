import { useVirtualizer } from "@tanstack/react-virtual";
import Highlight from "highlight-react/dist/highlight";
import { useEffect } from "react";
/**
 * RowVirtualizer Component
 * @param {Object} props - Component props
 * @param {Array} props.dataSource - Array of data items to be rendered
 * @param {Object} props.reference - Reference to the parent element
 * @param {string} props.wordSearch - Search query string
 * @param {Function} props.setCurrentItems - Function to set the current items
 * @param {Function} props.setRowVirtualizer - Function to set the row virtualizer
 * @returns {JSX.Element} - Rendered component
 */
const RowVirtualizer = ({
  dataSource,
  reference,
  wordSearch,
  setCurrentItems,
  setRowVirtualizer,
}) => {
  // Initialize a virtualizer for efficient rendering of large datasets
  const rowVirtualizer = useVirtualizer({
    count: dataSource.length,
    getScrollElement: () => reference.current,
    estimateSize: () => 44,
  });

  // Update the current items and row virtualizer when the virtualizer's items change
  useEffect(() => {
    setCurrentItems(rowVirtualizer.getVirtualItems());
    setRowVirtualizer(rowVirtualizer);
  }, [rowVirtualizer.getVirtualItems()]);

  // Render the virtualized rows with highlighting based on the search query
  return (
    <>
      <div
        ref={reference}
        style={{
          height: "90vh",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <Highlight search={wordSearch} key={virtualItem.index}>
              <p
                key={virtualItem.key}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                {dataSource[virtualItem.index]}
              </p>
            </Highlight>
          ))}
        </div>
      </div>
    </>
  );
};

export default RowVirtualizer;
