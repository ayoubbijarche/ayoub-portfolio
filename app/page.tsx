import NavigationCircle from "@/components/NavigationCircle"
import CustomCursor from "@/components/CustomCursor";

const Home = () => {
  return(
    <div>
      <NavigationCircle leftcirclepage="/a" rightcirclepage="/projects"/>
      <CustomCursor />
    </div>
  )
}

export default Home;
