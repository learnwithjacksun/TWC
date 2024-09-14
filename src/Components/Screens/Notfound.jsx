import Icon from "../UI/Icon";
import Layout from "../UI/Layout";
import PageTransition from "../UI/PageTransition";

const Notfound = () => {
  return (
    <>
      <PageTransition>
        <Layout>
          <div className="main">
            <div>
              <div className="text-center text-sub mt-8">
                <Icon styles="text-[3em]">hourglass_disabled</Icon>
                <h1 className="font-extrabold text-6xl font-sora">404</h1>
                <p className="text-sub">
                  Page not ready. Developer still dey cook! 🤷‍♂️
                </p>
              </div>
            </div>
          </div>
        </Layout>
      </PageTransition>
    </>
  );
};

export default Notfound;
