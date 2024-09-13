import Hero from "../UI/Hero"
import Layout from "../UI/Layout"
import RecentProjects from "../UI/RecentProjects"

const Home = () => {
  return (
    <>
      <Layout>
        <Hero />
        <RecentProjects/>
    </Layout>
    </>
  )
}

export default Home