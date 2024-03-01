import React, { useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";  //Redux hooks (useSelector, useDispatch) are used to interact with the Redux store.
import moment from "moment";
import copy from "copy-to-clipboard";   //External libraries like moment and copy-to-clipboard are imported.

import upvote from "../../assets/sort-up.svg";
import downvote from "../../assets/sort-down.svg";
import "./Questions.css";    //Images (upvote and downvote) and a CSS file (Questions.css) are imported.
import Avatar from "../../components/Avatar/Avatar";
import DisplayAnswer from "./DisplayAnswer";     //The Avatar and DisplayAnswer components are also imported.


import {       //Action functions (postAnswer, deleteQuestion, voteQuestion) from the question Redux actions are imported.
  postAnswer,
  deleteQuestion,
  voteQuestion,
} from "../../actions/question";

const QuestionsDetails = () => {    //The functional component QuestionsDetails is defined.
  const { id } = useParams();
  const questionsList = useSelector((state) => state.questionsReducer);
  //The questionsList, Answer, Navigate, dispatch, User, location, and url variables are declared.

  const [Answer, setAnswer] = useState("");
  const Navigate = useNavigate();
  const dispatch = useDispatch();        //React hooks (useParams, useState, useNavigate, useSelector, useDispatch, useLocation) are used to manage state and retrieve parameters from the URL.

  const User = useSelector((state) => state.currentUserReducer);
  const location = useLocation();
  const url = "http://localhost:3000";


  //Event handling functions for posting answers, sharing, deleting questions, upvoting, and downvoting are defined.

  const handlePostAns = (e, answerLength) => {
    e.preventDefault();
    if (User === null) {
      alert("Login or Signup to answer a question");
      Navigate("/Auth");
    } else {
      if (Answer === "") {
        alert("Enter an answer before submitting");
      } else {
        dispatch(
          postAnswer({
            id,
            noOfAnswers: answerLength + 1,
            answerBody: Answer,
            userAnswered: User.result.name,
          })
        );
        setAnswer("");
      }
    }
  };

  const handleShare = () => {
    copy(url + location.pathname);
    alert("Copied url : " + url + location.pathname);
  };

  const handleDelete = () => {
    dispatch(deleteQuestion(id, Navigate));
  };

  const handleUpVote = () => {
    if (User === null) {
      alert("Login or Signup to up vote a question");
      Navigate("/Auth");
    } else {
      dispatch(voteQuestion(id, "upVote"));
    }
  };

  const handleDownVote = () => {
    if (User === null) {
      alert("Login or Signup to down vote a question");
      Navigate("/Auth");
    } else {
      dispatch(voteQuestion(id, "downVote"));
    }
  };

  return (
    <div className="question-details-page">
      {questionsList.data === null ? (     //If questionsList.data is null, display a loading message.
        <h1>Loading...</h1>
      ) : (
        <>
          {questionsList.data
            .filter((question) => question._id === id)
            .map((question) => (      //Map through questions, filter by the provided id, and render the details if found.
              <div key={question._id}>    
                <section className="question-details-container">
                  <h1>{question.questionTitle}</h1>
                  <div className="question-details-container-2">
                    <div className="question-votes">
                      <img
                        src={upvote}
                        alt=""
                        width="18"
                        className="votes-icon"
                        onClick={handleUpVote}
                      />
                      <p>{question.upVote.length - question.downVote.length}</p>   
                      <img       //Display question title, voting buttons (upvote and downvote), vote count, question body, tags, and user actions.
                        src={downvote}
                        alt=""
                        width="18"
                        className="votes-icon"
                        onClick={handleDownVote}
                      />
                    </div>
                    <div style={{ width: "100%" }}>
                      <p className="question-body">{question.questionBody}</p>
                      <div className="question-details-tags">
                        {question.questionTags.map((tag) => (
                          <p key={tag}>{tag}</p>
                        ))}
                      </div>
                      <div className="question-actions-user">
                        <div>
                          <button type="button" onClick={handleShare}>
                            Share
                          </button>
                          {User?.result?._id === question?.userId && (
                            <button type="button" onClick={handleDelete}>
                              Delete
                            </button>
                          )}
                        </div>
                        <div>
                          <p>asked {moment(question.askedOn).fromNow()}</p>
                          <Link
                            to={`/Users/${question.userId}`}
                            className="user-link"
                            style={{ color: "#0086d8" }}
                          >
                            <Avatar
                              backgroundColor="orange"
                              px="8px"
                              py="5px"
                              borderRadius="4px"
                            >
                              {question.userPosted.charAt(0).toUpperCase()}
                            </Avatar>
                            <div>{question.userPosted}</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>  
                
                {question.noOfAnswers !== 0 && (   //If there are answers, display the count and use the DisplayAnswer component to render them.
                  <section>
                    <h3>{question.noOfAnswers} Answers</h3>
                    <DisplayAnswer
                      key={question._id}
                      question={question}
                      handleShare={handleShare}
                    />
                  </section>
                )}       
                <section className="post-ans-container">   
                  <h3>Your Answer</h3>
                  <form     //Form to post a new answer, including a textarea for the answer, and a button to submit.
                    onSubmit={(e) => {
                      handlePostAns(e, question.answer.length);
                    }}
                  >
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      value={Answer}
                      onChange={(e) => setAnswer(e.target.value)}
                    ></textarea>
                    <br />
                    <input
                      type="submit"
                      className="post-ans-btn"
                      value="Post Your Answer"
                    />
                  </form>    
                  <p>   
                    Browse other Question tagged    
                    {question.questionTags.map((tag) => (
                      <Link to="/Tags" key={tag} className="ans-tags">
                        {" "}
                        {tag}{" "}
                      </Link>
                    ))}{" "}
                    or
                    <Link
                      to="/AskQuestion"
                      style={{ textDecoration: "none", color: "#009dff" }}
                    >   
                      {" "}
                      ask your own question.     
                    </Link>
                  </p>
                </section>  
              </div>         //Display links to browse questions with the same tags or ask a new question.
            ))}   
        </>
      )}
    </div>
  );
};

export default QuestionsDetails;


//This code represents a React component for displaying details of a single question, including voting, answers, and the ability to post new answers. It integrates with Redux for state management and React Router for navigation. Additionally, it uses various UI components and styling to create a comprehensive Q&A page.