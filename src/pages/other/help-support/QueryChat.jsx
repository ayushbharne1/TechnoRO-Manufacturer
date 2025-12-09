import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Dashboard from "../../../assets/images/Dashboard.svg";
import { MdArrowForwardIos } from "react-icons/md";
import { useParams } from "react-router-dom";


const QueryChat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "support",
      text: "Lorem ipsum dolor sit amet consectetur. Turpis vivamus pretium ac diam vitae cursus. Dictumst id consequat nunc vitae tincidunt risus quam lectus.",
      time: "06:34 AM",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      sender: "user",
      text: "Lorem ipsum dolor sit amet consectetur. Turpis vivamus pretium ac diam vitae cursus. Dictumst id consequat nunc vitae tincidunt risus quam lectus.",
      time: "06:35 AM",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      id: 3,
      sender: "support",
      text: "Lorem ipsum dolor sit amet consectetur. Turpis vivamus pretium ac diam vitae cursus. Dictumst id consequat nunc vitae tincidunt risus quam lectus.",
      time: "06:36 AM",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 4,
      sender: "user",
      text: "Lorem ipsum dolor sit amet consectetur. Turpis vivamus pretium ac diam vitae cursus. Dictumst id consequat nunc vitae tincidunt risus quam lectus.",
      time: "06:37 AM",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const handleSend = () => {
    if (newMessage.trim() === "") return;
    setMessages([
      ...messages,
      {
        id: Date.now(),
        sender: "user",
        text: newMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      },
    ]);
    setNewMessage("");
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 pt-4 pb-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <span className="text-gray-500 font-medium">
            <img src={Dashboard} onClick={() => navigate("/dashboard")} alt="Dashboard Icon" className="inline w-5 h-5 mr-1" />
          </span>
          <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
          <span
            onClick={() => navigate("/help-support")}
            className="text-gray-900 font-medium cursor-pointer"
          >
            Help & Support
          </span>
          <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
          <span
            onClick={() => navigate(`/query-details/${id}`)}
            className="text-gray-900 font-medium cursor-pointer"
          >
            Query Details
          </span>
          <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
          <span className="text-[#4A90E2] font-medium cursor-pointer">
            Chat
          </span>
        </div>
        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900">
          Darlene Robertson
        </h1>
        <div className="border-b-2 border-gray-400 mb-2 mt-4"></div>
      </div>

      <hr className="border-gray-200" />

      {/* Chat Messages */}
      <div className="flex-1 px-4 py-4 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`flex items-start gap-3 max-w-md ${msg.sender === "user" ? "flex-row-reverse" : ""
                  }`}
              >
                <img
                  src={msg.avatar}
                  alt="avatar"
                  className="w-9 h-9 rounded-full flex-shrink-0"
                />
                <div
                  className={`rounded-2xl px-4 py-3 ${msg.sender === "user"
                    ? "bg-blue-500 text-white rounded-tr-sm"
                    : "bg-amber-700 text-white rounded-tl-sm"
                    }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p className="text-xs mt-1 opacity-90">{msg.time}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-3">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="avatar"
                className="w-9 h-9 rounded-full"
              />
              <span className="text-sm text-gray-600">Typing...</span>
            </div>
          )}
        </div>
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <input
            type="text"
            placeholder="Type Message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-gray-400"
          />
          <button
            onClick={handleSend}
            className="bg-teal-400 text-white font-medium px-8 py-2.5 rounded-md transition-colors text-sm"
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
};

export default QueryChat;