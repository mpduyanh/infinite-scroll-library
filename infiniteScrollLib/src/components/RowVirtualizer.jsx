import { useVirtualizer } from "@tanstack/react-virtual";
import Highlight from "highlight-react/dist/highlight";
import { useEffect } from "react";

const RowVirtualizer = ({
  dataSource,
  reference,
  wordSearch,
  setCurrentItems,
  setRowVirtualizer,
}) => {
  const rowVirtualizer = useVirtualizer({
    count: dataSource.length,
    getScrollElement: () => reference.current,
    estimateSize: () => 44,
  });

  useEffect(() => {
    setCurrentItems(rowVirtualizer.getVirtualItems());
    setRowVirtualizer(rowVirtualizer);
  }, [rowVirtualizer.getVirtualItems()]);

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
