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
