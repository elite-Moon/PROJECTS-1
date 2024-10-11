/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
import run from '../config/gemini';

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState('');
  const [recentPrompt, setRecentPrompt] = useState('');
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState('');

  //*logic for making typing effect with delay *//
  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 50 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData('');
    setLoading(true);
    setShowResult(true);
    let response;
    if (prompt !== undefined) {
      response = await run(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompt((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await run(input);
    }
    let responseArray = response.split('**');
    let newReponse = '';
    //* this loop is used for filter out ** and make the word bold**/
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newReponse += responseArray[i];
      } else {
        newReponse += '<b>' + responseArray[i] + '</b>';
      }
    }
    //** again we make filter for single start* to make a line break */
    let newReponse2 = newReponse.split('*').join('</br>');
    let newReponseArray = newReponse2.split(' ');
    for (let i = 0; i < newReponseArray.length; i++) {
      const nextWord = newReponseArray[i];
      delayPara(i, nextWord + ' ');
    }

    setInput('');
    setLoading(false);
  };

  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    showResult,
    recentPrompt,
    setRecentPrompt,
    loading,
    resultData,
    input,
    setInput,
    onSent,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
