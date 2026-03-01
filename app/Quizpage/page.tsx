    // 'use client';

    // import { useState, useEffect } from 'react';
    // import { ChevronRight, RotateCcw, Check, X } from 'lucide-react';

    // const QuizPage = () => {
    // const [selectedSubject, setSelectedSubject] = useState('math');
    // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    // const [score, setScore] = useState(0);
    // const [showScore, setShowScore] = useState(false);
    // const [selectedAnswer, setSelectedAnswer] = useState(null);
    // const [answered, setAnswered] = useState(false);

    // // Quiz data by subject
    // const quizData = {
    //     math: [
    //     {
    //         question: 'What is 15 × 8?',
    //         options: ['100', '120', '130', '140'],
    //         correct: 1,
    //     },
    //     {
    //         question: 'What is the square root of 144?',
    //         options: ['10', '11', '12', '13'],
    //         correct: 2,
    //     },
    //     {
    //         question: 'If x + 5 = 12, what is x?',
    //         options: ['5', '6', '7', '8'],
    //         correct: 2,
    //     },
    //     {
    //         question: 'What is 25% of 80?',
    //         options: ['15', '20', '25', '30'],
    //         correct: 1,
    //     },
    //     {
    //         question: 'What is the area of a circle with radius 5?',
    //         options: ['75.5', '78.5', '80.5', '82.5'],
    //         correct: 1,
    //     },
    //     ],
    //     science: [
    //     {
    //         question: 'What is the chemical symbol for Gold?',
    //         options: ['Go', 'Gd', 'Au', 'Ag'],
    //         correct: 2,
    //     },
    //     {
    //         question: 'What is the speed of light?',
    //         options: [
    //         '300,000 km/s',
    //         '150,000 km/s',
    //         '450,000 km/s',
    //         '600,000 km/s',
    //         ],
    //         correct: 0,
    //     },
    //     {
    //         question: 'What gas do plants absorb from the atmosphere?',
    //         options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
    //         correct: 2,
    //     },
    //     {
    //         question: 'What is the smallest unit of life?',
    //         options: ['Atom', 'Molecule', 'Cell', 'Tissue'],
    //         correct: 2,
    //     },
    //     {
    //         question: 'What is the most abundant element in the universe?',
    //         options: ['Helium', 'Hydrogen', 'Oxygen', 'Carbon'],
    //         correct: 1,
    //     },
    //     ],
    //     coding: [
    //     {
    //         question: 'What does HTML stand for?',
    //         options: [
    //         'Hyper Text Markup Language',
    //         'High Tech Modern Language',
    //         'Home Tool Markup Language',
    //         'Hyperlinks and Text Markup Language',
    //         ],
    //         correct: 0,
    //     },
    //     {
    //         question: 'Which language is known as the "language of the web"?',
    //         options: ['Python', 'JavaScript', 'Java', 'C++'],
    //         correct: 1,
    //     },
    //     {
    //         question: 'What does CSS stand for?',
    //         options: [
    //         'Computer Style Sheets',
    //         'Cascading Style Sheets',
    //         'Creative Style Sheets',
    //         'Coded Style Sheets',
    //         ],
    //         correct: 1,
    //     },
    //     {
    //         question: 'What is a variable?',
    //         options: [
    //         'A function',
    //         'A named container for storing data',
    //         'A loop',
    //         'An array',
    //         ],
    //         correct: 1,
    //     },
    //     {
    //         question: 'Which of these is a JavaScript framework?',
    //         options: ['Django', 'React', 'Laravel', 'Flask'],
    //         correct: 1,
    //     },
    //     ],
    //     language: [
    //     {
    //         question: 'What is the plural of "child"?',
    //         options: ['Childs', 'Children', 'Childes', 'Childz'],
    //         correct: 1,
    //     },
    //     {
    //         question: 'Which word is spelled correctly?',
    //         options: ['Recieve', 'Receipt', 'Receit', 'Recepit'],
    //         correct: 1,
    //     },
    //     {
    //         question: 'What does "ubiquitous" mean?',
    //         options: [
    //         'Rare and hard to find',
    //         'Present everywhere',
    //         'Confused and lost',
    //         'Very expensive',
    //         ],
    //         correct: 1,
    //     },
    //     {
    //         question: 'Which sentence is grammatically correct?',
    //         options: [
    //         'She dont like apples',
    //         'She does not likes apples',
    //         'She does not like apples',
    //         'She do not like apples',
    //         ],
    //         correct: 2,
    //     },
    //     {
    //         question: 'What is a synonym for "benevolent"?',
    //         options: ['Evil', 'Kind', 'Angry', 'Lazy'],
    //         correct: 1,
    //     },
    //     ],
    // };

    // const subjects = [
    //     { value: 'math', label: 'Mathematics' },
    //     { value: 'science', label: 'Science' },
    //     { value: 'coding', label: 'Coding' },
    //     { value: 'language', label: 'Language' },
    // ];

    

    // const questions = quizData[selectedSubject];
    // const currentQuestion = questions[currentQuestionIndex];

    // const handleAnswerClick = (index) => {
    //     if (answered) return;

    //     setSelectedAnswer(index);
    //     setAnswered(true);

    //     if (index === currentQuestion.correct) {
    //     setScore(score + 1);
    //     }
    // };

    // const handleNext = () => {
    //     const nextIndex = currentQuestionIndex + 1;
    //     if (nextIndex < questions.length) {
    //     setCurrentQuestionIndex(nextIndex);
    //     setSelectedAnswer(null);
    //     setAnswered(false);
    //     } else {
    //     setShowScore(true);
    //     }
    // };

    // const handleReset = () => {
    //     setSelectedSubject('math');
    //     setCurrentQuestionIndex(0);
    //     setScore(0);
    //     setShowScore(false);
    //     setSelectedAnswer(null);
    //     setAnswered(false);
    // };

    // const handleSubjectChange = (e) => {
    //     setSelectedSubject(e.target.value);
    //     setCurrentQuestionIndex(0);
    //     setScore(0);
    //     setShowScore(false);
    //     setSelectedAnswer(null);
    //     setAnswered(false);
    // };

    // return (
    //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 text-slate-900 p-6 md:p-12">
    //     {/* Animated background elements */}
    //     <div className="fixed inset-0 overflow-hidden pointer-events-none">
    //         <div className="absolute top-20 right-20 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl"></div>
    //         <div className="absolute bottom-32 left-20 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl"></div>
    //     </div>

    //     <div className="relative max-w-2xl mx-auto">
    //         {/* Header */}
    //         <div className="mb-12 text-center">
    //         <h1 className="text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
    //             Quiz Master
    //         </h1>
    //         <p className="text-slate-600 text-lg">Test your knowledge across multiple subjects</p>
    //         </div>

    //         {/* Subject Selector */}
    //         <div className="mb-10 bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-blue-200/50 shadow-lg">
    //         <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
    //             Select Subject
    //         </label>
    //         <select
    //             value={selectedSubject}
    //             onChange={handleSubjectChange}
    //             className="w-full px-4 py-3 rounded-lg bg-white border-2 border-blue-300 text-slate-900 font-medium focus:outline-none focus:border-blue-600 transition-colors cursor-pointer"
    //         >
    //             {subjects.map((subject) => (
    //             <option key={subject.value} value={subject.value}>
    //                 {subject.label}
    //             </option>
    //             ))}
    //         </select>
    //         </div>

    //         {/* Quiz Container */}
    //         <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 md:p-10 border border-blue-200/50 shadow-2xl">
    //         {showScore ? (
    //             // Results Screen
    //             <div className="text-center space-y-8 animate-fadeIn">
    //             <div className="text-7xl font-black mb-4">🎉</div>
    //             <h2 className="text-4xl md:text-5xl font-black text-slate-900">Quiz Complete!</h2>
    //             <div className="bg-gradient-to-r from-blue-100/60 to-purple-100/60 rounded-2xl p-8 my-8 border border-blue-300/50">
    //                 <p className="text-slate-600 text-lg mb-2">Your Score</p>
    //                 <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
    //                 {score} / {questions.length}
    //                 </p>
    //                 <p className="text-slate-600 mt-4">
    //                 {Math.round((score / questions.length) * 100)}% Correct
    //                 </p>
    //             </div>
    //             <button
    //                 onClick={handleReset}
    //                 className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
    //             >
    //                 <RotateCcw size={20} />
    //                 Try Another Quiz
    //             </button>
    //             </div>
    //         ) : (
    //             // Question Screen
    //             <div className="space-y-8 animate-fadeIn">
    //             {/* Progress Bar */}
    //             <div className="space-y-3">
    //                 <div className="flex justify-between items-center">
    //                 <span className="text-sm font-semibold text-blue-600">
    //                     Question {currentQuestionIndex + 1}
    //                 </span>
    //                 <span className="text-sm font-semibold text-slate-600">
    //                     {currentQuestionIndex + 1} of {questions.length}
    //                 </span>
    //                 </div>
    //                 <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
    //                 <div
    //                     className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500 ease-out"
    //                     style={{
    //                     width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
    //                     }}
    //                 ></div>
    //                 </div>
    //             </div>

    //             {/* Question */}
    //             <div>
    //                 <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
    //                 {currentQuestion.question}
    //                 </h2>
    //             </div>

    //             {/* Options */}
    //             <div className="space-y-3">
    //                 {currentQuestion.options.map((option, index) => {
    //                 const isSelected = selectedAnswer === index;
    //                 const isCorrect = index === currentQuestion.correct;
    //                 const showCorrect = answered && isCorrect;
    //                 const showIncorrect = answered && isSelected && !isCorrect;

    //                 return (
    //                     <button
    //                     key={index}
    //                     onClick={() => handleAnswerClick(index)}
    //                     disabled={answered}
    //                     className={`w-full p-4 md:p-5 rounded-xl font-semibold text-left transition-all duration-300 flex items-center gap-3 ${
    //                         showCorrect
    //                         ? 'bg-gradient-to-r from-green-100 to-green-200 border-2 border-green-500 text-slate-900'
    //                         : showIncorrect
    //                             ? 'bg-gradient-to-r from-red-100 to-red-200 border-2 border-red-500 text-slate-900'
    //                             : isSelected && answered
    //                             ? 'bg-slate-100 border-2 border-slate-400'
    //                             : 'bg-slate-50 border-2 border-slate-300 hover:border-blue-500 hover:bg-blue-50 cursor-pointer'
    //                     } ${!answered && !isSelected ? 'hover:scale-102' : ''}`}
    //                     >
    //                     <div
    //                         className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
    //                         showCorrect
    //                             ? 'border-green-500 bg-green-100'
    //                             : showIncorrect
    //                             ? 'border-red-500 bg-red-100'
    //                             : 'border-slate-400'
    //                         }`}
    //                     >
    //                         {showCorrect && <Check size={16} className="text-green-600" />}
    //                         {showIncorrect && <X size={16} className="text-red-600" />}
    //                     </div>
    //                     <span>{option}</span>
    //                     </button>
    //                 );
    //                 })}
    //             </div>

    //             {/* Next Button */}
    //             {answered && (
    //                 <button
    //                 onClick={handleNext}
    //                 className="w-full group relative inline-flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 animate-slideUp"
    //                 >
    //                 {currentQuestionIndex === questions.length - 1
    //                     ? 'See Results'
    //                     : 'Next Question'}
    //                 <ChevronRight size={20} />
    //                 </button>
    //             )}
    //             </div>
    //         )}
    //         </div>

    //         {/* Footer Stats */}
    //         {!showScore && (
    //         <div className="mt-8 text-center text-slate-600 text-sm">
    //             <p>Score: {score} / {questions.length}</p>
    //         </div>
    //         )}
    //     </div>

    //     <style jsx>{`
    //         @keyframes fadeIn {
    //         from {
    //             opacity: 0;
    //             transform: translateY(10px);
    //         }
    //         to {
    //             opacity: 1;
    //             transform: translateY(0);
    //         }
    //         }

    //         @keyframes slideUp {
    //         from {
    //             opacity: 0;
    //             transform: translateY(20px);
    //         }
    //         to {
    //             opacity: 1;
    //             transform: translateY(0);
    //         }
    //         }

    //         .animate-fadeIn {
    //         animation: fadeIn 0.5s ease-out;
    //         }

    //         .animate-slideUp {
    //         animation: slideUp 0.5s ease-out;
    //         }

    //         .hover\:scale-102:hover {
    //         transform: scale(1.02);
    //         }
    //     `}</style>
    //     </div>
    // );
    // };

    // export default QuizPage;
    'use client';

import { useState } from 'react';
import { ChevronRight, RotateCcw, Check, X } from 'lucide-react';

// Define quiz data outside component (static)
const quizData = {
  math: [
    {
      question: 'What is 15 × 8?',
      options: ['100', '120', '130', '140'],
      correct: 1,
    },
    {
      question: 'What is the square root of 144?',
      options: ['10', '11', '12', '13'],
      correct: 2,
    },
    // ... (rest of your quiz data)
  ],
  science: [ /* ... */ ],
  coding: [ /* ... */ ],
  language: [ /* ... */ ],
};

// Subjects list (also static)
const subjects = [
  { value: 'math', label: 'Mathematics' },
  { value: 'science', label: 'Science' },
  { value: 'coding', label: 'Coding' },
  { value: 'language', label: 'Language' },
];

// Type for subject keys – now quizData is in scope
type SubjectKey = keyof typeof quizData;

const QuizPage = () => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectKey>('math');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const questions = quizData[selectedSubject];
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (index: number) => {
    if (answered) return;

    setSelectedAnswer(index);
    setAnswered(true);

    if (index === currentQuestion.correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowScore(true);
    }
  };

  const handleReset = () => {
    setSelectedSubject('math');
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(e.target.value as SubjectKey);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  return (
    // ... (rest of your JSX remains unchanged)
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 text-slate-900 p-6 md:p-12">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-20 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-32 left-20 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-12 text-center">
            <h1 className="text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Quiz Master
            </h1>
            <p className="text-slate-600 text-lg">Test your knowledge across multiple subjects</p>
            </div>

            {/* Subject Selector */}
            <div className="mb-10 bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-blue-200/50 shadow-lg">
            <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
                Select Subject
            </label>
            <select
                value={selectedSubject}
                onChange={handleSubjectChange}
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-blue-300 text-slate-900 font-medium focus:outline-none focus:border-blue-600 transition-colors cursor-pointer"
            >
                {subjects.map((subject) => (
                <option key={subject.value} value={subject.value}>
                    {subject.label}
                </option>
                ))}
            </select>
            </div>

            {/* Quiz Container */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 md:p-10 border border-blue-200/50 shadow-2xl">
            {showScore ? (
                // Results Screen
                <div className="text-center space-y-8 animate-fadeIn">
                <div className="text-7xl font-black mb-4">🎉</div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900">Quiz Complete!</h2>
                <div className="bg-gradient-to-r from-blue-100/60 to-purple-100/60 rounded-2xl p-8 my-8 border border-blue-300/50">
                    <p className="text-slate-600 text-lg mb-2">Your Score</p>
                    <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    {score} / {questions.length}
                    </p>
                    <p className="text-slate-600 mt-4">
                    {Math.round((score / questions.length) * 100)}% Correct
                    </p>
                </div>
                <button
                    onClick={handleReset}
                    className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
                >
                    <RotateCcw size={20} />
                    Try Another Quiz
                </button>
                </div>
            ) : (
                // Question Screen
                <div className="space-y-8 animate-fadeIn">
                {/* Progress Bar */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-blue-600">
                        Question {currentQuestionIndex + 1}
                    </span>
                    <span className="text-sm font-semibold text-slate-600">
                        {currentQuestionIndex + 1} of {questions.length}
                    </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500 ease-out"
                        style={{
                        width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                        }}
                    ></div>
                    </div>
                </div>

                {/* Question */}
                <div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                    {currentQuestion.question}
                    </h2>
                </div>

                {/* Options */}
                <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === currentQuestion.correct;
                    const showCorrect = answered && isCorrect;
                    const showIncorrect = answered && isSelected && !isCorrect;

                    return (
                        <button
                        key={index}
                        onClick={() => handleAnswerClick(index)}
                        disabled={answered}
                        className={`w-full p-4 md:p-5 rounded-xl font-semibold text-left transition-all duration-300 flex items-center gap-3 ${
                            showCorrect
                            ? 'bg-gradient-to-r from-green-100 to-green-200 border-2 border-green-500 text-slate-900'
                            : showIncorrect
                                ? 'bg-gradient-to-r from-red-100 to-red-200 border-2 border-red-500 text-slate-900'
                                : isSelected && answered
                                ? 'bg-slate-100 border-2 border-slate-400'
                                : 'bg-slate-50 border-2 border-slate-300 hover:border-blue-500 hover:bg-blue-50 cursor-pointer'
                        } ${!answered && !isSelected ? 'hover:scale-102' : ''}`}
                        >
                        <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            showCorrect
                                ? 'border-green-500 bg-green-100'
                                : showIncorrect
                                ? 'border-red-500 bg-red-100'
                                : 'border-slate-400'
                            }`}
                        >
                            {showCorrect && <Check size={16} className="text-green-600" />}
                            {showIncorrect && <X size={16} className="text-red-600" />}
                        </div>
                        <span>{option}</span>
                        </button>
                    );
                    })}
                </div>

                {/* Next Button */}
                {answered && (
                    <button
                    onClick={handleNext}
                    className="w-full group relative inline-flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 animate-slideUp"
                    >
                    {currentQuestionIndex === questions.length - 1
                        ? 'See Results'
                        : 'Next Question'}
                    <ChevronRight size={20} />
                    </button>
                )}
                </div>
            )}
            </div>

            {/* Footer Stats */}
            {!showScore && (
            <div className="mt-8 text-center text-slate-600 text-sm">
                <p>Score: {score} / {questions.length}</p>
            </div>
            )}
        </div>

        <style jsx>{`
            @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
            }

            @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
            }

            .animate-fadeIn {
            animation: fadeIn 0.5s ease-out;
            }

            .animate-slideUp {
            animation: slideUp 0.5s ease-out;
            }

            .hover\:scale-102:hover {
            transform: scale(1.02);
            }
        `}</style>
        </div>
    

   
  );
};

export default QuizPage;