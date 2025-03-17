import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaArrowLeft,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Tooltip,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-toastify";

const QuizPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { quizData } = location.state || {
    quizData: { questions: [], type: "" },
  };
  const [questions, setQuestions] = useState(quizData.questions);
  const [updatedQuestionContent, setUpdatedQuestionContent] = useState("");
  const [updatedOptions, setUpdatedOptions] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
  const [authorId, setAuthorId] = useState(null);
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    setAuthorId(getCookie("token", "user"));
  }, []);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const handleHomeClick = () => {
    navigate("/home");
  };

  const handleUpdate = (question, index) => {
    setUpdatedQuestionContent(question.question);
    setUpdatedOptions(question.options.slice());
    setSelectedQuestionIndex(index);
    onOpen();
  };

  const handleDelete = (index) => {
    // Show confirmation dialog
    if (window.confirm("Are you sure you want to delete this question?")) {
      const updatedQuestions = questions.filter(
        (_, qIndex) => qIndex !== index
      );
      setQuestions(updatedQuestions);
      setSelectedQuestionIndex(null);
      toast.success("Question deleted successfully!");
    }
  };

  const handleUpdateSubmit = () => {
    if (selectedQuestionIndex !== null) {
      const updatedQuestions = [...questions];
      updatedQuestions[selectedQuestionIndex].question = updatedQuestionContent;
      updatedQuestions[selectedQuestionIndex].options = updatedOptions;
      setQuestions(updatedQuestions);

      setSelectedQuestionIndex(null);
      onClose();
      toast.success("Question updated successfully!");
    }
  };

  const handleOptionChange = (value, optionIndex) => {
    const newOptions = [...updatedOptions];
    newOptions[optionIndex] = value;
    setUpdatedOptions(newOptions);
  };

  const removeOption = (optionIndex) => {
    const newOptions = [...updatedOptions];
    newOptions.splice(optionIndex, 1);
    setUpdatedOptions(newOptions);
  };

  const addOption = () => {
    const newOptions = [...updatedOptions];
    newOptions.push("");
    setUpdatedOptions(newOptions);
  };

  const handlePostQuiz = async () => {
    if (questions.length === 0) {
      toast.error("Cannot post an empty quiz!");
      return;
    }

    setIsPosting(true);
    toast.info("Posting quiz...");

    for (const question of questions) {
      const quizToPost = {
        id: Math.floor(Math.random() * 1000000),
        type: question.type,
        title: " ",
        question: question.question,
        options: question.options,
        correctAnswer: question.correctAnswer,
        author: authorId,
      };

      try {
        const token = getCookie("token");
        const response = await axios.post(
          "https://s61-parandhama-reddy-capstone-examinato.onrender.com/api/postquiz",
          quizToPost,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          toast.success("Quiz posted successfully!");

          // Redirect to home page after successful quiz post
          setTimeout(() => {
            navigate("/home");
          }, 1000);
        }
      } catch (error) {
        toast.error("Failed to post the quiz");
        setIsPosting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Tooltip label="Back to Home" placement="bottom">
              <button
                onClick={handleHomeClick}
                className="flex items-center justify-center p-2 mr-4 rounded-full hover:bg-gray-100 transition-colors"
              >
                <FaArrowLeft className="text-gray-700" />
              </button>
            </Tooltip>
            <h1 className="text-2xl font-bold text-gray-800">Quiz Preview</h1>
          </div>

          <Button
            onClick={handlePostQuiz}
            colorScheme="green"
            size="md"
            isLoading={isPosting}
            loadingText="Posting..."
            className="px-6"
            disabled={questions.length === 0 || isPosting}
          >
            {isPosting ? <Spinner size="sm" /> : "Publish Quiz"}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {questions.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="flex flex-col items-center justify-center text-gray-400 py-10">
              <svg
                className="w-20 h-20 mb-4 opacity-50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-xl font-medium">No questions in this quiz</p>
              <p className="text-sm mt-2">
                Go back to add questions to your quiz
              </p>
              <Button
                onClick={handleHomeClick}
                colorScheme="blue"
                size="md"
                className="mt-6"
              >
                Return to Quiz Creator
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {questions.map((question, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="p-4 bg-indigo-50 border-b border-gray-100 flex justify-between items-center">
                  <span className="font-medium text-gray-700 flex items-center">
                    <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs mr-2">
                      Q{index + 1}
                    </span>
                    <span className="text-xs text-gray-500">
                      {question.type}
                    </span>
                  </span>
                  <div className="flex space-x-2">
                    <Tooltip label="Edit question" placement="top">
                      <Button
                        size="sm"
                        colorScheme="blue"
                        onClick={() => handleUpdate(question, index)}
                        leftIcon={<FaEdit />}
                      >
                        Edit
                      </Button>
                    </Tooltip>
                    <Tooltip label="Delete question" placement="top">
                      <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleDelete(index)}
                        leftIcon={<FaTrash />}
                      >
                        Delete
                      </Button>
                    </Tooltip>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-6 flex justify-center">
                    {typeof question.question === "string" &&
                    question.question.startsWith("data:image/") ? (
                      <div className="rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={question.question}
                          alt={`Question ${index + 1}`}
                          className="max-h-60 object-contain"
                        />
                      </div>
                    ) : (
                      <div className="text-lg font-medium text-gray-800">
                        {question.question}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {question.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`p-4 rounded-lg border ${
                          question.correctAnswer === `Option ${optIndex + 1}`
                            ? "border-green-200 bg-green-50"
                            : "border-gray-200 bg-gray-50"
                        } flex items-center justify-center`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-sm bg-gray-200 text-gray-800 px-2 py-1 rounded-full">
                            {optIndex + 1}
                          </span>
                          {typeof option === "string" &&
                          option.startsWith("data:image/") ? (
                            <img
                              src={option}
                              alt={`Option ${optIndex + 1}`}
                              className="max-h-32 object-contain"
                            />
                          ) : (
                            <span>{option}</span>
                          )}
                          {question.correctAnswer ===
                            `Option ${optIndex + 1}` && (
                            <span className="ml-2 text-green-600 font-medium text-sm">
                              (Correct)
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Update Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
        <ModalContent borderRadius="xl" shadow="xl">
          <ModalHeader
            bg="blue.50"
            borderTopRadius="xl"
            borderBottom="1px"
            borderColor="gray.100"
          >
            Edit Question
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody py={6}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question
              </label>
              <Input
                value={updatedQuestionContent}
                onChange={(e) => setUpdatedQuestionContent(e.target.value)}
                placeholder="Enter question text"
                size="md"
                borderRadius="md"
                focusBorderColor="blue.400"
              />

              {typeof updatedQuestionContent === "string" &&
                updatedQuestionContent.startsWith("data:image/") && (
                  <div className="mt-2 p-2 border border-gray-200 rounded-md">
                    <img
                      src={updatedQuestionContent}
                      alt="Question Preview"
                      className="max-h-40 mx-auto"
                    />
                  </div>
                )}
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Options
                </label>
                <Button
                  size="xs"
                  colorScheme="blue"
                  variant="outline"
                  onClick={addOption}
                  leftIcon={<FaPlus />}
                >
                  Add Option
                </Button>
              </div>

              {updatedOptions.map((option, optIndex) => (
                <div key={optIndex} className="flex items-center mb-3">
                  <div className="flex-shrink-0 mr-2">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 text-gray-500 text-xs font-medium">
                      {optIndex + 1}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <Input
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(e.target.value, optIndex)
                      }
                      placeholder={`Option ${optIndex + 1}`}
                      size="md"
                      borderRadius="md"
                      focusBorderColor="blue.400"
                    />

                    {typeof option === "string" &&
                      option.startsWith("data:image/") && (
                        <div className="mt-1 p-1 border border-gray-200 rounded-md">
                          <img
                            src={option}
                            alt={`Option ${optIndex + 1} Preview`}
                            className="max-h-20 mx-auto"
                          />
                        </div>
                      )}
                  </div>
                  <Button
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                    className="ml-2"
                    onClick={() => removeOption(optIndex)}
                    isDisabled={updatedOptions.length <= 2}
                  >
                    <FaTimes />
                  </Button>
                </div>
              ))}
            </div>
          </ModalBody>

          <ModalFooter
            borderTop="1px"
            borderColor="gray.100"
            bg="gray.50"
            borderBottomRadius="xl"
          >
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleUpdateSubmit}
              leftIcon={<FaSave />}
            >
              Save Changes
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default QuizPreview;
