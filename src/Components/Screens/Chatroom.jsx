import Heading from "../UI/Heading";
import Icon from "../UI/Icon";
import Layout from "../UI/Layout";
import PageTransition from "../UI/PageTransition";

const Chatroom = () => {
  return (
    <>
      <PageTransition>
        <Layout>
          <div className="main">
            <Heading title="Chatroom" subtitle="Let's talk...🗣" />

            <div className="layout flex flex-col min-h-[400px]">
              <div className="my-8">
                <div className="user-message-box">
                  <div className="h-10 w-10 flex-center bg-secondary rounded-full">
                    <Icon styles="text-[1.3em]">delete</Icon>
                  </div>
                  <div className="h-20 max-w-[70%]">
                    <div className="user-message-body text-display">Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, saepe Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, quae.</div>
                    <div className="user-message-details">
                    Jackson - september, 7th 2024
                  </div>
                  </div>
                </div>
                
                <div className="other-message-box">
                  <div className="h-20 max-w-[70%]">
                    <div className="other-message-body text-display">Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, saepe Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, quae.</div>
                    <div className="other-message-details">
                    Jackson - september, 7th 2024
                  </div>
                  </div>
               </div>

                
              </div>
              <div className="ms-0 mt-auto fixed p-2 bottom-0 bg-light inset-x-0 flex justify-center">
                <form className="layout w-full mx-auto flex gap-2">
                  <textarea
                    name="message"
                    id="message"
                    placeholder="Write a message..."
                    className="flex-1 px-4 text-sub text-sm font-medium pt-3 h-12 bg-secondary border border-line rounded-xl"
                  ></textarea>
                  <button type="submit" className="btn-primary px-3 rounded-lg">
                    <span>Send</span>
                    <Icon>call_made</Icon>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Layout>
      </PageTransition>
    </>
  );
};

export default Chatroom;
