import { useParams } from "react-router-dom";
import Heading from "../UI/Heading";
import Layout from "../UI/Layout";
import useProject from "../../Hooks/useProject";
import { useEffect, useState } from "react";
import { storage } from "../../Lib/appwriteConfig";
import Icon from "../UI/Icon";
import { formatDate } from "../../Utils/dateFormat";
import PageTransition from "../UI/PageTransition";

const Preview = () => {
  const { id } = useParams();
  const { projects } = useProject();
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (projects) {
      const foundProject = projects.find((project) => project.userid === id);
      setProject(foundProject);
    }
  }, [projects, id]);

  if (!projects) {
    return (
      <>
        <Layout>
          <div className="main">Fetching project...</div>;
        </Layout>
      </>
    );
  }

  if (!project) {
    return <div>Project not found!</div>;
  }

  return (
    <>
      <PageTransition>
        <Layout>
          <div className="main">
            <Heading
              title="Preview"
              subtitle={`What is ${project?.title} all about? 🤔`}
            />
            <div className="my-6 flex flex-col md:flex-row gap-4 md:gap-8">
              <div className="flex-1 rounded-md border border-line overflow-hidden">
                <img
                  src={
                    project?.image &&
                    storage.getFilePreview("images", project?.image).href
                  }
                  alt="Project Image"
                />
              </div>
              <div className="flex-1 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-bold font-sora">
                    {project?.title}
                  </h2>
                  <p className="text-sub text-sm font-medium">
                    By {project?.name}{" "}
                    <span className="text-xs font-semibold bg-green-500/10 border-green-500  border px-2 rounded-full text-green-500 inline-flex">
                      Developer
                    </span>
                  </p>
                  <p className="text-sm">{formatDate(project?.$createdAt)}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-sm">Description:</h3>
                  <p className="mt-2 text-display text-sm text-sub">
                    {project?.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-sm">Tools/ Stack:</h3>
                  <ul className="flex flex-wrap gap-2 mt-2">
                    {project?.tools.map((x, y) => (
                      <li
                        key={y}
                        className="text-sm px-4 py-2 rounded-full bg-lighter border border-line"
                      >
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={project?.link}
                  className="btn-primary w-[200px] h-10 rounded-lg"
                >
                  <span>Project Link</span>
                  <Icon styles="text-[1.3em]">open_in_new</Icon>
                </a>
              </div>
            </div>
          </div>
        </Layout>
      </PageTransition>
    </>
  );
};

export default Preview;
