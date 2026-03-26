import Home from "@/pages/Home/Home";
import Events from "@/pages/Events/Events";
import Lectures from "@/pages/Lectures/Lectures";
import Projects from "@/pages/Projects/Projects";
import Resources from "@/pages/Resources/Resources";
import Teams from "@/pages/Teams/Teams";
// import Leaderboard from "@/pages/Leaderboard/Leaderboard";
import ReadingGroups from "@/pages/ReadingGroups/ReadingGroups";
// import Portfolio from "@/pages/Portfolio/Portfolio";

export const headersItems = [
  { name: "Home", link: "/", component: <Home /> },
  // { name: "Portfolio", link: "/portfolio", component: <Portfolio /> },
  { name: "Events", link: "/events", component: <Events /> },
  { name: "Lectures", link: "/lectures", component: <Lectures /> },
  { name: "Projects", link: "/projects", component: <Projects /> },
  { name: "Team", link: "/teams", component: <Teams /> },
  {
    name: "Reading Groups",
    link: "/reading_groups",
    component: <ReadingGroups />,
  },
  { name: "Resources", link: "/resources", component: <Resources /> },
  // { name: "Leaderboard", link: "/leaderboard", component: <Leaderboard /> },
];
