import { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const Chatbot = () => {
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState([]);
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  useEffect(() => {
    const savedConversation = localStorage.getItem("conversation");
    if (savedConversation) {
      setConversation(JSON.parse(savedConversation));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("conversation", JSON.stringify(conversation));
  }, [conversation]);

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();

    const newConversation = [
      ...conversation,
      { question, answer: "Generating..." },
    ];
    setConversation(newConversation);

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${"AIzaSyCEvqPJLKKipjJ1hOblhFPVwn7uvC78D5w"}`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      const answer = response.data.candidates[0].content.parts[0].text;
      const updatedConversation = newConversation.map((conv, index) =>
        index === newConversation.length - 1 ? { ...conv, answer } : conv
      );

      setConversation(updatedConversation);
      setQuestion(""); // Clear the textarea
    } catch (error) {
      console.log(error);
      const updatedConversation = newConversation.map((conv, index) =>
        index === newConversation.length - 1
          ? {
              ...conv,
              answer: "Sorry - Something went wrong. Please try again!",
            }
          : conv
      );
      setConversation(updatedConversation);
    }

    setGeneratingAnswer(false);
  }

  const handleClearConversation = () => {
    setConversation([]);
    localStorage.removeItem("conversation");
  };

  return (
    <div>
      <form onSubmit={generateAnswer} className="mb-4">
        <textarea
          required
          className="border border-gray-300 rounded w-full my-2 min-h-fit p-3 transition-all duration-300 focus:border-blue-400 focus:shadow-lg"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything"
        ></textarea>
        <button
          type="submit"
          className={`bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-all duration-300 ${
            generatingAnswer ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={generatingAnswer}
        >
          Generate answer
        </button>
        <button
          type="button"
          onClick={handleClearConversation}
          className="bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition-all duration-300 ml-2"
        >
          Clear
        </button>
      </form>
      <div className="overflow-y-auto max-h-60">
        {conversation.map((conv, index) => (
          <div key={index} className="mb-4">
            <p className="font-bold"> {conv.question}</p>
            <ReactMarkdown>{conv.answer}</ReactMarkdown>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chatbot;
