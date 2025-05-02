import { useState, useEffect } from 'react';
import CalcButton from './CalcButton';
import './Calculator.css';

function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState('');

  function toggleDarkMode() {
    document.body.classList.toggle('dark');
    setDarkMode((prev) => !prev);
  }

  function handleClick(value) {
    setInput((prev) => prev + value);
    setError('');
  }

  function backspace() {
    setInput((prev) => prev.slice(0, -1));
  }

  function clear() {
    setInput('');
    setResult('');
    setError('');
  }

  function calculate() {
    try {
      const evalResult = eval(input);
      setResult(evalResult);
      setError('');
    } catch {
      setResult('');
      setError('Felaktig inmatning');
    }
  }

  useEffect(() => {
    function handleKeyDown(e) {
      const key = e.key;
      if ('0123456789+-*/.'.includes(key)) {
        handleClick(key);
      } else if (key === 'Enter') {
        calculate();
      } else if (key === 'Backspace') {
        backspace();
      } else if (key === 'Escape') {
        clear();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="container">
      <button
        onClick={toggleDarkMode}
        className="toggle-mode"
      >
        {darkMode ? 'VÄXLA TILL LJUST LÄGE ☀️' : 'VÄXLA TILL MÖRKT LÄGE 🌙'}
      </button>

      <div className="calculator">
        <div className="display">
          <div>{input || '0'}</div>
          <div className="result">{result !== '' ? '= ' + result : ''}</div>
          {error && <div className="error">{error}</div>}
        </div>

        <div className="buttons">
          {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map((btn) => (
            <CalcButton
              key={btn}
              value={btn}
              onClick={(val) => {
                if (val === '=') calculate();
                else handleClick(val);
              }}
            />
          ))}
          <button className="backspace" onClick={backspace}>⌫</button>
          <button className="clear" onClick={clear}>C</button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
