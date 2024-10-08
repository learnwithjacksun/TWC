import { useState, useEffect, useRef } from "react";
import Heading from "../UI/Heading";
import Icon from "../UI/Icon";
import Layout from "../UI/Layout";
import PageTransition from "../UI/PageTransition";
import toast from "react-hot-toast";
import useChats from "../../Hooks/useChats";
import useAuth from "../../Hooks/useAuth";
import Modal from "../UI/Modal";
import { Link } from "react-router-dom";

const Chatroom = () => {
  const { user } = useAuth();
  const { sendMessage, chats, deleteMessage } = useChats();
  const [message, setMessage] = useState("");
  const chatEndRef = useRef(null);
  const handleSumbit = (e) => {
    e.preventDefault();

    if (!message)toast.error("Enter message first!");
    else if (!user) setModal((prev) => !prev);
    else {
      sendMessage(message);
      setMessage("");
    }
  };

  const handleDelete = (id) => {
    toast.promise(deleteMessage(id), {
      loading: "Deleting message...",
      success: "Message deleted!",
      error: "Failed to delete message!",
    });
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  const [modal, setModal] = useState(false);

  return (
    <>
      <PageTransition>
        <Layout>
          <div className="main">
            <Heading title="Chatroom" subtitle="Let's talk...🗣" />

            <div className="layout flex flex-col min-h-[400px]">
              <div className="my-8 flex flex-col gap-4 md:gap-10">
                {chats?.map((chat) => (
                  <div
                     data-aos="zoom-in-up"
                      data-aos-delay="200"
                    key={chat.userid}
                    className={`${
                      user?.$id === chat.userid
                        ? "user-message-box"
                        : "other-message-box"
                    }`}
                  >
                    {user?.$id === chat.userid && (
                      <div
                        onClick={() => handleDelete(chat.$id)}
                        className="h-10 w-10 flex-center bg-secondary rounded-full"
                      >
                        <Icon styles="text-[1.3em] text-sub">delete</Icon>
                      </div>
                    )}
                    <div className="max-w-[70%]">
                      <div
                        className={`${
                          user?.$id === chat.userid
                            ? "user-message-body"
                            : "other-message-body"
                        } text-display`}
                      >
                        {chat?.message}
                      </div>
                      <div
                        className={`${
                          user?.$id === chat.userid
                            ? "user-message-details"
                            : "other-message-details"
                        }`}
                      >
                        {chat?.name} -{" "}
                        {new Date(chat?.$createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}

                <div ref={chatEndRef}></div>
              </div>
              <div className="ms-0 mt-auto fixed p-2 bottom-2 bg-light inset-x-0 flex justify-center">
                <form
                  onSubmit={handleSumbit}
                  className="layout w-full mx-auto flex gap-2"
                >
                  <textarea
                    name="message"
                    id="message"
                    placeholder="Write a message..."
                    className="flex-1 px-4 text-sm font-medium pt-3 h-12 bg-secondary border border-line rounded-xl placeholder:text-sub"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                  <button type="submit" className="btn-primary px-3 rounded-lg">
                    <span>Send</span>
                    <Icon styles={"text-[1.3em]"}>call_made</Icon>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Layout>
      </PageTransition>

      {modal && (
        <Modal toggleModal={() => setModal((prev) => !prev)} title="Hold on!🤚">
          <div>
            <p>You need to login first! 🤷‍♂️</p>
            <Link
              to="/profile"
              className="btn-primary rounded-lg w-1/2 mt-4 h-9"
            >
              <span>Login Now</span>
              <Icon>arrow_forward</Icon>
            </Link>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Chatroom;
