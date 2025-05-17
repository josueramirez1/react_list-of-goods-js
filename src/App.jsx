import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const buttonLabels = [
  'Sort alphabetically',
  'Sort by length',
  'Reverse',
];

export const App = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [buttonArr, setButtonArr] = useState([...buttonLabels]);
  const [isAlpha, setIsAlpha] = useState('is-light');
  const [isLength, setIsLength] = useState('is-light');
  const [isReverse, setIsReverse] = useState('is-light');

  const setAlphabetically = () => {
    setIsAlpha('');
    setIsLength('is-light');
    setGoods(prevGoods => {
      let sortedGoods = [];

      if (isAlpha === 'is-light' && isReverse === 'is-light') {
        sortedGoods = [...prevGoods].sort((a, b) => a.localeCompare(b));
      } else if (
        (isLength === '' && isReverse === '') ||
        (isLength === 'is-light' && isReverse === '')
      ) {
        sortedGoods = [...prevGoods].sort((a, b) => b.localeCompare(a));
      }

      return sortedGoods;
    });

    if (!buttonArr.includes('Reset')) {
      setButtonArr([...buttonArr, 'Reset']);
    }
  };

  const setByLength = () => {
    setIsLength('');
    setIsAlpha('is-light');

    setGoods(prevGoods => {
      let sortedGoods = [];

      if (isLength === 'is-light' && isReverse === 'is-light') {
        sortedGoods = [...prevGoods].sort((a, b) => a.length - b.length);
      } else if (
        (isLength === '' && isReverse === '') ||
        (isLength === 'is-light' && isReverse === '')
      ) {
        sortedGoods = [...prevGoods].sort((a, b) => b.length - a.length);
      }

      return sortedGoods;
    });

    if (!buttonArr.includes('Reset')) {
      setButtonArr([...buttonArr, 'Reset']);
    }
  };

  const reverseArray = () => {
    setIsReverse(prev => (prev === '' ? 'is-light' : ''));

    setGoods(prevGoods => {
      const sortedGoods = [...prevGoods].reverse();

      return sortedGoods;
    });

    if (!buttonArr.includes('Reset')) {
      setButtonArr([...buttonArr, 'Reset']);
    } else if (
      buttonArr.includes('Reset') &&
      isAlpha === 'is-light' &&
      isLength === 'is-light' &&
      isReverse === ''
    ) {
      setButtonArr([...buttonLabels]);
    }
  };

  const resetArray = () => {
    setIsAlpha('is-light');
    setIsLength('is-light');
    setIsReverse('is-light');
    setGoods([...goodsFromServer]);
    if (buttonArr.includes('Reset')) {
      setButtonArr([...buttonLabels]);
    }
  };

  const handleClickBtn = button => {
    if (button === 'Sort alphabetically') {
      setAlphabetically();
    } else if (button === 'Sort by length') {
      setByLength();
    } else if (button === 'Reverse') {
      reverseArray();
    } else {
      resetArray();
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        {buttonArr.map(button => {
          return (
            <button
              key={button}
              type="button"
              onClick={() => {
                handleClickBtn(button);
              }}
              className={classNames({
                button: true,
                [`is-info ${isAlpha}`]: button === 'Sort alphabetically',
                [`is-success ${isLength}`]: button === 'Sort by length',
                [`is-warning ${isReverse}`]: button === 'Reverse',
                [`is-danger is-light`]: button === 'Reset',
              })}
            >
              {button}
            </button>
          );
        })}
      </div>
      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
