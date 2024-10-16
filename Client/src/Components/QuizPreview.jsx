import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
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
    const updatedQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(updatedQuestions);
    setSelectedQuestionIndex(null);
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
    console.log("Questions to be posted:", questions);

    // Show toast immediately when the quiz post starts
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
          "https://s61-parandhama-reddy-capstone-examinato-1.onrender.com/api/postquiz",
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
          }, 1500); // Delay for user to see the success toast before redirect
        }
      } catch (error) {
        toast.error("Failed to post the quiz");
      }
    }
  };

  return (
    <div>
      <div className="p-4 bg-white drop-shadow-lg sticky top-0 rounded-2xl">
        <div className="flex items-center text-center">
          <FaArrowLeft
            className="h-8 w-20 cursor-pointer"
            onClick={handleHomeClick}
          />
          <div className="relative left-[40%] text-3xl">
            <strong>Quiz Preview</strong>
          </div>
          <Button
            className="absolute right-[-60%] p-2"
            colorScheme="green"
            onClick={handlePostQuiz}
          >
            Post Quiz
          </Button>
        </div>
      </div>
      <div className="p-5 bg-[#E9EDC9]">
        <div className="bg-[#E9EDC9] flex gap-5 box-border">
          <div className="flex-col justify-center items-center text-center w-full gap-5 p-10 bg-white border h-auto overflow-hidden shadow-lg rounded">
            {questions.map((question, index) => (
              <div
                key={index}
                className="flex-col justify-center border-[1px] p-10 m-5"
              >
                <div className="mb-5 font-bold">
                  {typeof question.question === "string" &&
                  question.question.startsWith("data:image/") ? (
                    <img
                      src={question.question}
                      alt={`Question ${index + 1}`}
                      className="h-[25vh] ml-96"
                    />
                  ) : (
                    question.question
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {question.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className="flex justify-center items-center"
                    >
                      {typeof option === "string" &&
                      option.startsWith("data:image/") ? (
                        <img
                          src={option}
                          alt={`Option ${optIndex + 1}`}
                          className="h-[20vh]"
                        />
                      ) : (
                        option
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4">
                  <Button
                    colorScheme="blue"
                    onClick={() => handleUpdate(question, index)}
                  >
                    Update
                  </Button>
                  <Button colorScheme="red" onClick={() => handleDelete(index)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Update Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Content</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={updatedQuestionContent}
              onChange={(e) => setUpdatedQuestionContent(e.target.value)}
            />
            <div className="mt-4">
              <h3>Options</h3>
              {updatedOptions.map((option, optIndex) => (
                <div
                  key={optIndex}
                  className="flex justify-between items-center mb-2"
                >
                  <Input
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(e.target.value, optIndex)
                    }
                    className="w-full text-black p-2 rounded-lg"
                  />
                  <Button
                    size="xs"
                    colorScheme="red"
                    onClick={() => removeOption(optIndex)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button size="sm" colorScheme="green" onClick={addOption} mb={2}>
                Add Option
              </Button>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdateSubmit}>
              Save Changes
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default QuizPreview;
