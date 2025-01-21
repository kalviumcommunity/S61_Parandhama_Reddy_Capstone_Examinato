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
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${"AIzaSyBz8cedb27K00VxG3LJEcB6_52uNZj26wo"}`,
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
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <form onSubmit={generateAnswer} className="mb-6 w-full max-w-2xl">
        <textarea
          required
          className="border border-gray-300 rounded-lg w-full p-4 my-3 min-h-24 transition-all duration-300 focus:border-blue-500 focus:shadow-lg"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything..."
        ></textarea>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className={`bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all duration-300 ${
              generatingAnswer ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={generatingAnswer}
          >
            {generatingAnswer ? "Generating..." : "Generate Answer"}
          </button>
          <button
            type="button"
            onClick={handleClearConversation}
            className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition-all duration-300"
          >
            Clear
          </button>
        </div>
      </form>
      <div className="w-full max-w-2xl p-4 bg-white shadow-lg rounded-lg overflow-y-auto max-h-96">
        {conversation.length === 0 ? (
          <p className="text-gray-400 text-center">Start the conversation!</p>
        ) : (
          conversation.map((conv, index) => (
            <div
              key={index}
              className="mb-4 p-3 bg-gray-100 rounded-md shadow-sm"
            >
              <p className="font-semibold text-blue-700 mb-1">
                {conv.question}
              </p>
              <div className="text-gray-700">
                <ReactMarkdown>{conv.answer}</ReactMarkdown>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Chatbot;
