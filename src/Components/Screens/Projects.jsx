import { Link } from "react-router-dom";
import useProject from "../../Hooks/useProject";
import Card from "../UI/Card";
import Grid from "../UI/Grid";
import Heading from "../UI/Heading";
import Layout from "../UI/Layout";
import Icon from "../UI/Icon";

const Projects = () => {
  const { projects, deleteUserProject } = useProject();

  return (
    <Layout>
      <div className="main">
        <Heading title="All projects" subtitle="Mummy see ooo...see what techies are cooking! 🔥" />

        <div className="flex justify-end mt-6">
          <Link to="/upload" className="btn-primary h-10 px-6 rounded-xl">
            <Icon>add</Icon>
            <span>Upload Project</span>
          </Link>
        </div>

        {projects.length === 0 && (
                <div className="text-center text-sub">
                  <Icon styles="text-[3em]">hourglass_disabled</Icon>
                  <p className="text-sub">There are no projects yet!</p>
                </div>
              )}
        {!projects && (
                <div className="text-center text-sub">
                  <Icon styles="text-[3em]">pending</Icon>
                  <p className="text-sub">Fetching...</p>
                </div>
              )}
        <Grid>
          {projects?.map((project) => (
            <Card
              key={project.$id}
              {...project}
              date={project.$createdAt}
              handleDelete={()=> deleteUserProject(project.$id)} 
              userid={project.userid} 
            />
          ))}
        </Grid>
      </div>
    </Layout>
  );
};

export default Projects;
