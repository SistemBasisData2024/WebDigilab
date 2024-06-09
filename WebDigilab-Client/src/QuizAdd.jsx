import React, { useState } from 'react';
import axios from 'axios';
import Navigation from './Navigation';

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
    const newQuestion = {
      ...currentQuestion,
      questionNo: questions.length + 1
    };
    setQuestions([...questions, newQuestion]);
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
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      const { quiz_id } = quizResponse.data.quiz_id;

      for (let question of questions) {
        question.quizId = quiz_id;
        await axios.post(
          'http://localhost:4000/createQuestion',
          question,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
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
    <>
      <Navigation />

      <section className="bg-gray-900 text-white min-h-screen">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Create a New Quiz</h2>
            <p className="mt-4 text-gray-300">
              Fill out the details below to create a new quiz and add questions.
            </p>
          </div>

          <div className="mt-8 bg-gray-800 rounded-xl p-8 shadow-xl mb-4">
            <div className="form-group mb-4">
              <label className="block text-gray-300">Chapter ID</label>
              <input
                type="text"
                name="chapterId"
                value={quizDetails.chapterId}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white border border-gray-600 p-2 rounded-lg"
              />
            </div>
            <div className="form-group mb-4">
              <label className="block text-gray-300">Quiz Title</label>
              <input
                type="text"
                name="quizTitle"
                value={quizDetails.quizTitle}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white border border-gray-600 p-2 rounded-lg"
              />
            </div>
            <div className="form-group mb-4">
              <label className="block text-gray-300">Quiz Description</label>
              <textarea
                name="quizDesc"
                value={quizDetails.quizDesc}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white border border-gray-600 p-2 rounded-lg"
              ></textarea>
            </div>
            <div className="form-group mb-4">
              <label className="block text-gray-300">Quiz Image URL</label>
              <input
                type="text"
                name="quizImage"
                value={quizDetails.quizImage}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white border border-gray-600 p-2 rounded-lg"
              />
            </div>

            <hr className="border-gray-600 my-6" />

            <h3 className="text-2xl font-bold text-center">Add Questions</h3>
            <div className="form-group mb-4">
              <label className="block text-gray-300">Question No</label>
              <p className="text-white">{questions.length + 1}</p>
            </div>
            <div className="form-group mb-4">
              <label className="block text-gray-300">Question Text</label>
              <input
                type="text"
                name="questionText"
                value={currentQuestion.questionText}
                onChange={handleQuestionChange}
                className="w-full bg-gray-700 text-white border border-gray-600 p-2 rounded-lg"
              />
            </div>
            <div className="form-group mb-4">
              <label className="block text-gray-300">Question Image URL</label>
              <input
                type="text"
                name="questionImage"
                value={currentQuestion.questionImage}
                onChange={handleQuestionChange}
                className="w-full bg-gray-700 text-white border border-gray-600 p-2 rounded-lg"
              />
            </div>
            <div className="form-group mb-4">
              <label className="block text-gray-300">Question Answer</label>
              <input
                type="text"
                name="questionAnswer"
                value={currentQuestion.questionAnswer}
                onChange={handleQuestionChange}
                className="w-full bg-gray-700 text-white border border-gray-600 p-2 rounded-lg"
              />
            </div>
            <div className="text-center">
              <button
                onClick={handleAddQuestion}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mr-4"
              >
                Add Question
              </button>
              <button
                onClick={handleSubmitQuiz}
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
              >
                Create Quiz
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default QuizAdd;