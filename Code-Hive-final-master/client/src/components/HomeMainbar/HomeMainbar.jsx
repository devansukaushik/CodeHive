import React from "react";   /* React variable is being used to reference the default export of the "react" module. The React variable can then be used throughout the module to render components, create hooks, or use other features provided by the "react" library.*/


import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./HomeMainbar.css";
import QuestionList from "./QuestionList";

const HomeMainbar = () => {
  const location = useLocation();
  const user = 1;
  const navigate = useNavigate();

/* three variables are defined using hooks: location, user, and navigate. */


  const questionsList = useSelector((state) => state.questionsReducer);

  const checkAuth = () => {
    if (user === null) {
      alert("login or signup to ask a question");
      navigate("/Auth");
    } else {
      navigate("/AskQuestion");
    }
  };

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1> 𝐓𝐨𝐩-𝐫𝐚𝐭𝐞𝐝 𝐐𝐮𝐞𝐬𝐭𝐢𝐨𝐧𝐬</h1>
        ) : (
          <h1> 𝐀𝐥𝐥 𝐐𝐮𝐞𝐬𝐭𝐢𝐨𝐧</h1>
        )}
        <button onClick={checkAuth} className="ask-btn">
          Get Help
        </button>
      </div>
      <div>
        {questionsList.data === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <p>{questionsList.data.length} questions</p>
            <QuestionList questionsList={questionsList.data} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomeMainbar;
