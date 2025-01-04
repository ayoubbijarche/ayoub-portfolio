import dynamic from "next/dynamic";

const Dynamicprojectcontent = dynamic(()=>import("@/components/projects/content"))


const Projects = () => {
  return(
    <Dynamicprojectcontent/>
  )
}

export default Projects;
