import Hero from "../UI/Hero";
import Layout from "../UI/Layout";
import PageTransition from "../UI/PageTransition";
import RecentProjects from "../UI/RecentProjects";

const Home = () => {
  return (
    <>
      <PageTransition>
        <Layout>
          <Hero />
          <RecentProjects />
        </Layout>
      </PageTransition>
    </>
  );
};

export default Home;
