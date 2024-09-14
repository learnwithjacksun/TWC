import useProject from "../../Hooks/useProject"
import Card from "./Card"
import Grid from "./Grid"
import Heading from "./Heading"

const RecentProjects = () => {
  const { projects, deleteUserProject } = useProject()
  const recentProjects = projects.slice(0, 3);
  return (
      <>
          <div className="main my-8">
        <Heading title="Recent Projects" subtitle="Some recent project techies are cooking up! 🔥" />
        
        <Grid>
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