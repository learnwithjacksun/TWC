import useProject from "../../Hooks/useProject";
import Card from "../UI/Card";
import Grid from "../UI/Grid";
import Heading from "../UI/Heading";
import Layout from "../UI/Layout";

const Projects = () => {
  const { projects } = useProject();

  return (
    <>
      <Layout>
        <div className="main">
          <Heading title="All projects" subtitle="Mummy see ooo...see what techies are cooking! 🔥" />

          <Grid>
            {projects?.map((project) => (
              <Card
                    key={project.$id}
                    id={project.$id}
                name={project.name}
                role={project.role}
                tools={project.tools}
                title={project.title}
                description={project.description}
                    image={project.image}
                    date={project.$createdAt}
              />
            ))}
          </Grid>
        </div>
      </Layout>
    </>
  );
};

export default Projects;
