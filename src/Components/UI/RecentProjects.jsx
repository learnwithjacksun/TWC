import useProject from "../../Hooks/useProject"
import Card from "./Card"
import Grid from "./Grid"
import Heading from "./Heading"
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useTheme from '../../Hooks/useTheme'
import Icon from "./Icon";
const RecentProjects = () => {
  const {darkMode}= useTheme()
  const { projects, deleteUserProject, loading } = useProject()
  const recentProjects = projects.slice(0, 3);
  return (
      <>
          <div className="main my-8">
        <Heading title="Recent Projects" subtitle="Some recent project techies are cooking up! 🔥" />
        

        {loading === false && recentProjects?.length === 0 && (
            <div className="text-center text-sub mt-10">
              <Icon styles="text-[3em]">hourglass_disabled</Icon>
              <p className="text-sub text-sm">There are no projects yet!</p>
            </div>
          )}
        <Grid>

        {loading && (
              <>
                {Array(3)
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
        {recentProjects?.map((project) => (
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
      </>
  )
}

export default RecentProjects