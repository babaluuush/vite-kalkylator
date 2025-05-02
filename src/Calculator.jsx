import { useState, useEffect, useRef } from 'react';
import CalcButton from './CalcButton';
import './Calculator.css';

function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState('');
  const inputBuffer = useRef('');

  function toggleDarkMode() {
    document.body.classList.toggle('dark');
    setDarkMode((prev) => !prev);
  }

  function handleClick(value) {
    inputBuffer.current += value;
    setInput(inputBuffer.current);
    setError('');
  }

  function backspace() {
    inputBuffer.current = inputBuffer.current.slice(0, -1);
    setInput(inputBuffer.current);
  }

  function clear() {
    inputBuffer.current = '';
    setInput('');
    setResult('');
    setError('');
  }

  function calculate() {
    const expression = inputBuffer.current.trim();

    if (expression === '') {
      setResult('');
      setError('Du måste skriva in något');
      return;
    }

    try {
      const evalResult = eval(expression);
      setResult(evalResult);
      setInput(expression);
      setError('');
    } catch {
      setResult('');
      setError('Felaktig inmatning');
    }
  }

  useEffect(() => {
    function handleKeyDown(e) {
      const key = e.key;

      if (key === 'Enter' || key === 'NumpadEnter') {
        e.preventDefault();
        calculate();
      } else if (/^[0-9+\-*/.]$/.test(key)) {
        e.preventDefault();
        handleClick(key);
      } else if (key === 'Backspace') {
        e.preventDefault();
        backspace();
      } else if (key === 'Escape') {
        e.preventDefault();
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