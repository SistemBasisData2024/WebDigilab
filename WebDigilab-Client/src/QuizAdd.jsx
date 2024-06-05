import React, { useState } from 'react';
import axios from 'axios';

const QuizAdd = () => {
  const [quizDetails, setQuizDetails] = useState({
    chapterId: '',
    quizTitle: '',
    quizDesc: '',
    quizImage: ''
  });
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    quizId: 0,
    questionNo: '',
    questionText: '',
    questionImage: '',
    questionAnswer: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizDetails({
      ...quizDetails,
      [name]: value
    });
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setCurrentQuestion({
      ...currentQuestion,
      [name]: value
    });
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, currentQuestion]);
    console.log(currentQuestion);
    setCurrentQuestion({
        quizId: 0,
        questionNo: '',
        questionText: '',
        questionImage: '',
        questionAnswer: ''
    });
  };

  const handleSubmitQuiz = async () => {
    try {
        const quizResponse = await axios.post(
            `http://localhost:4000/createQuiz`, 
            quizDetails, 
            {   
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
      const {quiz_id} = quizResponse.data.quiz_id;
      //let quiz_id_string = JSON.stringify(data[0].quiz_id);
      //let quiz_id_int = JSON.parse(quiz_id_string);

      for (let question of questions) {
        console.log(quiz_id);
        question.quizId = quiz_id;
        console.log(question);
        await axios.post(
            'http://localhost:4000/createQuestion', 
            question
            , 
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
      }

      alert('Quiz created successfully');
    } catch (error) {
      console.error('Error creating quiz:', error);
      alert('Error creating quiz');
    }
  };

  return (
    <div className="create-quiz-form">
      <h2>Create a New Quiz</h2>
      <div className="form-group">
        <label>Chapter ID</label>
        <input type="text" name="chapterId" value={quizDetails.chapterId} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Quiz Title</label>
        <input type="text" name="quizTitle" value={quizDetails.quizTitle} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Quiz Description</label>
        <textarea name="quizDesc" value={quizDetails.quizDesc} onChange={handleChange}></textarea>
      </div>
      <div className="form-group">
        <label>Quiz Image URL</label>
        <input type="text" name="quizImage" value={quizDetails.quizImage} onChange={handleChange} />
      </div>
      <hr />
      <h3>Add Questions</h3>
      <div className="form-group">
        <label>Question No</label>
        <input type="text" name="questionNo" value={currentQuestion.questionNo} onChange={handleQuestionChange} />
      </div>
      <div className="form-group">
        <label>Question Text</label>
        <input type="text" name="questionText" value={currentQuestion.questionText} onChange={handleQuestionChange} />
      </div>
      <div className="form-group">
        <label>Question Image URL</label>
        <input type="text" name="questionImage" value={currentQuestion.questionImage} onChange={handleQuestionChange} />
      </div>
      <div className="form-group">
        <label>Question Answer</label>
        <input type="text" name="questionAnswer" value={currentQuestion.questionAnswer} onChange={handleQuestionChange} />
      </div>
      <button onClick={handleAddQuestion}>Add Question</button>
      <hr />
      <button onClick={handleSubmitQuiz}>Create Quiz</button>
    </div>
  );
};

export default QuizAdd;
