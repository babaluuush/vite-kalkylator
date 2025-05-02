function CalcButton({ value, onClick }) {
    return (
      <button onClick={() => onClick(value)}>
        {value}
      </button>
    );
  }
  
  export default CalcButton;
  