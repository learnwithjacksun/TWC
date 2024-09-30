import { Link, useNavigate } from "react-router-dom";
import useProject from "../../Hooks/useProject";
import Card from "../UI/Card";
import Grid from "../UI/Grid";
import Heading from "../UI/Heading";
import Layout from "../UI/Layout";
import Icon from "../UI/Icon";
import PageTransition from "../UI/PageTransition";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useTheme from "../../Hooks/useTheme";

const Projects = () => {
  const { darkMode } = useTheme();
  const { projects, deleteUserProject, loading } = useProject();
  const navigate = useNavigate();
  const previewProject = (project) => {
    navigate(`/projects/${project.$id}`, {
      state:{ project},
    });
  };

  return (
    <PageTransition>
      <Layout>
        <div className="main">
          <Heading
            title="All projects"
            subtitle="Mummy see ooo...see what techies are cooking! 🔥"
          />

          <div className="flex justify-end mt-6">
            <Link to="/upload" className="btn-primary h-10 px-6 rounded-xl">
              <Icon>add</Icon>
              <span>Upload Project</span>
            </Link>
          </div>

          {!loading && projects?.length === 0 && (
            <div className="text-center text-sub mt-10">
              <Icon styles="text-[3em]">hourglass_disabled</Icon>
              <p className="text-sub text-sm">There are no projects yet!</p>
            </div>
          )}

          <Grid>
            {loading && (
              <>
                {Array(6)
                  .fill()
                  .map((_, idx) => (
                    <Skeleton
                      key={idx}
                      baseColor={darkMode ? "#303030" : "#eee"}
                      highlightColor={darkMode ? "#444" : "#fff"}
                      style={{
                        minHeight: "280px",
                        borderRadius: "16px",
                      }}
                    />
                  ))}
              </>
            )}

            {projects?.map((project) => (
              <Card
                key={project.$id}
                previewProject={() => previewProject(project)}
                {...project}
                project={project}
                date={project.$createdAt}
                handleDelete={() =>
                  deleteUserProject(project.$id, project.image)
                }
                userid={project.userid}
              />
            ))}
          </Grid>
        </div>
      </Layout>
    </PageTransition>
  );
};

export default Projects;
