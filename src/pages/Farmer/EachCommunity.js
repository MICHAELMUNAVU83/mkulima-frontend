import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FiSend } from "react-icons/fi";

const EachCommunity = ({ loggedInUserId }) => {
  const [community, setCommunity] = useState({});
  const [messages, setMessages] = useState([]);
  const [textMessage, setTextMessage] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:3000/communities/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCommunity(data);
      });
  }, [community, id]);

  useEffect(() => {
    fetch(`http://localhost:3000/communities/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!filterQuery) {
          setMessages(data.messages);
        } else {
          setMessages(
            data.messages.filter((message) =>
              message.text.toLowerCase().includes(filterQuery.toLowerCase())
            )
          );
        }
      });
  }, [filterQuery, messages, id]);
  const sendMessage = (e) => {
    e.preventDefault();
    if (textMessage !== "") {
      fetch("http://127.0.0.1:3000/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: textMessage,
          user_id: Number(loggedInUserId),
          community_id: Number(id),
        }),
      })
        .then((response) => response.json())

        .then((data) => {
          setTextMessage("");
        });
    }
  };

  return (
    <div className="pt-24">
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search for a message"
          className="form-control w-[50%] h-[50px] p-2 mb-2 border-2 border-gray-200 rounded-xl"
          value={filterQuery}
          onChange={(e) => {
            setFilterQuery(e.target.value);
          }}
        />
      </div>
      <div className="w-[50%] mx-auto h-[600px] overflow-y-scroll flex flex-col justify-between shadow-gray-200 shadow-xl">
        <div
          className="flex flex-col gap-2 overflow-y-scroll"
          style={{ height: "calc(100% - 60px)" }}
        >
          {messages.map((message) => (
            <div
              className={
                message.user_id === loggedInUserId
                  ? "flex justify-end px-2"
                  : "flex justify-start px-2"
              }
            >
              <div
                className={
                  message.user_id === loggedInUserId
                    ? "bg-green-100 p-2 rounded-xl"
                    : "bg-gray-100 p-2 rounded-xl"
                }
              >
                <p
                  className={
                    message.user_id === loggedInUserId
                      ? "text-start text-black"
                      : "text-start text-gray-700"
                  }
                >
                  {message.text}
                </p>
                {message.user_id !== loggedInUserId && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                    <img
                      src={message.user_profile}
                      className="w-8 h-8 rounded-full"
                      alt="customer"
                    />
                    <p className="font-bold">{message.user_name}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="relative">
          <textarea
            type={"text"}
            value={textMessage}
            onChange={(e) => setTextMessage(e.target.value)}
            className="border border-gray-300 h-[100px]  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Type your message here..."
          />
          <FiSend
            size={25}
            className="absolute right-2 cursor-pointer hover:scale-105 transition-all duration-500 bottom-2"
            onClick={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default EachCommunity;
