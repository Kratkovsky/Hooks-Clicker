/*
С помщью хуков реализовать компонент кликера.
BASIC LEVEL
По нажатию на кнопку "Добавить" добавлять 1 единицу к счётчику
Отображать НАСКОЛЬКО единиц будет кнопка добавлять значение в счёт в отдельном элементе (Сколько добавляется за один клик)
Сделать возможность настраивать текущий шаг ( кол-во единиц, которые добавляются в счёт )
Сделать два режима: добавление шага и отнимание шага от счёта. Кнопка для изменения счёта должна быть одна.
ADVANCED LVL 
Создать кнопку autoClick и по нажатию автоматически с определенной частотой увеличивать счетчик. Частоту автонажатий разрешить регулировать. (например инпутом)
При запуске приложения сразу запускать автоклик.
*/
import React from 'react';
import { useEffect, useState } from 'react';

const Clicker = (elemRef) => {
  const [count, setCount] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [isStarted, setIstarted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [intervalId, setIntervalId] = useState(null);
  const [step, setStep] = useState(1);
  const [clicksPerIteration, setClicksPerIteration] = useState(1);
  const [isAdding, setIsAdding] = useState(true);

  useEffect(() => {
    autoClicks();
    return stopAutoClicks;
  }, []);

  const changeStep = (e) => setStep(+e.target.value);

  function changeSpeed(e) {
    setSpeed(+e.target.value);
  }

  const addClicks = () => {
    setClicks((clicks) => clicks + step);
  };

  const deleteClicks = () => {
    if (clicks > 0 && clicks >= step) {
      setClicks((clicks) => clicks - step);
    }
  };

  const autoClicks = () => {
    if (!isStarted) {
      setIstarted(true);
      const intervalId = setInterval(addClicks, speed * 1000);
      setIntervalId(intervalId);
    }
  };

  const stopAutoClicks = () => {
    setIntervalId((intervalId) => {
      clearInterval(intervalId);
      return null;
    });
    setIstarted(false);
  };

  const reset = () => {
    setClicks(0);
  };

  const handleInputChange = (event) => {
    setClicksPerIteration(parseInt(event.target.value) || 0);
  };

  const handleClick = () => {
    if (isAdding) {
      setCount(count + clicksPerIteration);
    } else {
      setCount(count - clicksPerIteration);
    }
    setIsAdding(!isAdding);
  };

  return (
    <div>
      <h1>Clicks : {clicks}</h1>
      <p>How many clicks do you want to add in one step?</p>
      <input
        type="number"
        value={clicksPerIteration}
        onChange={handleInputChange}
      />
      <p>Count: {count}</p>
      <button onClick={handleClick}>
        {isAdding ? `Add ${clicksPerIteration}` : `Subtract ${clicksPerIteration}`}
      </button>
      <button onClick={addClicks}>Add {step} of clicks </button>
      <button onClick={deleteClicks}>Remove {step} of clicks</button>
      <button onClick={autoClicks}>
        Auto clicks by {step} clicks with {speed}
      </button>
      <button onClick={stopAutoClicks}>Stop autoClick</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Clicker;
