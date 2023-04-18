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
  const [clicks, setClicks] = useState(0);
  const [isStarted, setIstarted] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [step, setStep] = useState(1);
  const [isAdding, setIsAdding] = useState(true);
  const [autoAddSpeed, setAutoAddSpeed] = useState(1);
  const [autoAddInterval, setAutoAddInterval] = useState(null);

  useEffect(() => {
    autoClicks();
    return stopAutoClicks;
  }, []);

  const addClicks = () => {
    setClicks((clicks) => clicks + step);
  };

  const autoClicks = () => {
    if (!isStarted) {
      setIstarted(true);
      const intervalId = setInterval(addClicks, autoAddSpeed * 1000);
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

  const handleClick = () => {
    if (isAdding) {
      setClicks((clicks) => clicks + step);
    } else {
      setClicks((clicks) => clicks - step);
    }
    setIsAdding(!isAdding);
  };

  const handleAutoAddClicks = () => {
    if (!autoAddInterval) {
      setAutoAddInterval(
        setInterval(() => {
          handleClick();
        }, autoAddSpeed),
      );
    } else {
      clearInterval(autoAddInterval);
      setAutoAddInterval(null);
    }
  };

  const handleInputChange = (e) => {
    setStep(parseInt(e.target.value) || 0);
  };

  const handleSpeedChange = (e) => {
    setAutoAddSpeed(parseInt(e.target.value) || 0);
  };

  return (
    <div>
      <p>How many clicks do you want to add in one step?</p>
      <input
        type='number'
        value={step}
        onChange={handleInputChange}
      />
      <button onClick={handleClick}>
        {isAdding
          ? `Add ${clicks}`
          : `Subtract ${clicks}`}
      </button>
      <button onClick={stopAutoClicks}>Stop</button>
      <button onClick={reset}>Reset</button>
      <input type='number' value={autoAddSpeed} onChange={handleSpeedChange} />
      <button onClick={handleAutoAddClicks}>
        {autoAddInterval ? 'Stop' : 'Start'} auto add clicks
      </button>
      <h1>Clicks : {clicks}</h1>
    </div>
  );
};

export default Clicker;
