import { useState } from "react";
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

const QuizPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { quizData } = location.state || { quizData: { questions: [] } };
  const [questions, setQuestions] = useState(quizData.questions);
  const [updatedQuestionContent, setUpdatedQuestionContent] = useState("");
  const [updatedOptions, setUpdatedOptions] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

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
    // quizData.questions = updatedQuestions;
    setSelectedQuestionIndex(null);
  };

  const handleUpdateSubmit = () => {
    if (selectedQuestionIndex !== null) {
      const updatedQuestions = [...questions];
      updatedQuestions[selectedQuestionIndex].question = updatedQuestionContent;
      updatedQuestions[selectedQuestionIndex].options = updatedOptions;
      setQuestions(updatedQuestions);

      // quizData.questions = updatedQuestions;
      setSelectedQuestionIndex(null);
      onClose();
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

  return (
    <div>
      <div className="p-2 bg-white drop-shadow-lg sticky top-0 rounded-2xl">
        <div className="flex items-center text-center">
          <FaArrowLeft
            className="h-8 w-20 cursor-pointer"
            onClick={handleHomeClick}
          />
          <div className="relative left-[40%] text-3xl">
            <strong>Quiz Preview</strong>
          </div>
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
              <Button size="sm" colorScheme="green" onClick={addOption}>
                Add Option
              </Button>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdateSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default QuizPreview;
