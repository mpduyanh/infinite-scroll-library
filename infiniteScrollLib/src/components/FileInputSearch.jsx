/**
 * FileInputSearch Component
 * @param {Object} props - Component props
 * @param {Function} props.handleClick - Function to handle input change
 * @param {string} props.wordSearch - Current search query string
 * @param {Object} props.countOutView - Object containing counts of occurrences above and below the viewport
 * @param {Function} props.handlePrev - Function to handle previous button click
 * @param {Function} props.handleNext - Function to handle next button click
 * @returns {JSX.Element} - Rendered component
 */
export default function FileInputSearch({
  handleClick,
  wordSearch,
  countOutView,
  handlePrev,
  handleNext,
}) {
  const { above, below } = countOutView;

  return (
    <>
      <div style={{ height: "8vh" }}>
        <input
          type="text"
          id="input"
          value={wordSearch}
          onChange={handleClick}
          placeholder="Search for text"
        ></input>
        <button onClick={handlePrev}>Prev</button>
        <span>
          Above: {above} Below: {below}
        </span>
        <button onClick={handleNext}>Next</button>
      </div>
    </>
  );
}
