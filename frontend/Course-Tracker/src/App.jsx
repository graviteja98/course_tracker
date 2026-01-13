import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

import TopNavbar from "./Components/TopNavbar";
import CourseSlider from "./Components/Carousal";
import CourseCarouselSection from "./Components/CourseCarouselSection";
import { dummyCourses } from "./data/dummyCourses";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <CssBaseline />

      <Box sx={{ width: "100%", overflowX: "hidden" }}>
        <TopNavbar />
        <Toolbar />

        <CourseSlider />

        <CourseCarouselSection
          title='Based on your recent searches'
          courses={dummyCourses}
        />

        <CourseCarouselSection
          title='Because you viewed "xyz"'
          courses={dummyCourses}
        />

        <CourseCarouselSection
          title='Popular for "ABC Role jobs"'
          courses={dummyCourses}
        />

        <CourseCarouselSection
          title='Trending'
          courses={dummyCourses}
        />

        <CourseCarouselSection
          title='Because you wishlisted "MYZ Course"'
          courses={dummyCourses}
        />

        <CourseCarouselSection
          title='Recommended to you based on ratings'
          courses={dummyCourses}
        />

        <CourseCarouselSection
          title='Because you enrolled in "AWS Cert"'
          courses={dummyCourses}
        />

        <CourseCarouselSection
          title='Short and sweet courses for you'
          courses={dummyCourses}
        />

        <CourseCarouselSection
          title='Top courses in "ABC Field"'
          courses={dummyCourses}
        />

        <CourseCarouselSection
          title='Featured courses'
          courses={dummyCourses}
        />
      </Box>
       <Footer />
    </>
  );
}

export default App;
