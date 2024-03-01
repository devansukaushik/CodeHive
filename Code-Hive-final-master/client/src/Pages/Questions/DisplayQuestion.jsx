import React from "react";     
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import QuestionsDetails from "./QuestionsDetails";


//DisplayQuestion is a functional component that takes two props, slideIn and handleSlideIn.
const DisplayQuestion = ({ slideIn, handleSlideIn }) => {
  return (
    //component has a top-level <div> with the class name "home-container-1"
    <div className="home-container-1">    
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      <div className="home-container-2">
        <QuestionsDetails />
        <RightSidebar />
      </div>
    </div>
  );
};

export default DisplayQuestion;
//The component returns JSX, defining the structure of the DisplayQuestion component.

