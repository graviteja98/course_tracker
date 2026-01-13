import React, { useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
} from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const slides = [
  {
    title: "React for Beginners",
    description:
      "Learn the fundamentals of React, components, hooks, and state management.",
    color: "#E3F2FD",
  },
  {
    title: "Advanced JavaScript",
    description:
      "Deep dive into closures, async programming, and performance optimization.",
    color: "#E8F5E9",
  },
  {
    title: "MERN Stack Bootcamp",
    description:
      "Build full-stack applications using MongoDB, Express, React, and Node.js.",
    color: "#FFF3E0",
  },
  {
    title: "System Design Basics",
    description:
      "Understand scalability, caching, and real-world system design.",
    color: "#FCE4EC",
  },
];

function CourseSlider() {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={{ position: "relative" }}>
      <IconButton
        onClick={scrollLeft}
        sx={{
          position: "absolute",
          top: "50%",
          left: 16,
          transform: "translateY(-50%)",
          zIndex: 10,
          backgroundColor: "white",
          boxShadow: 3,
        }}
      >
        <ChevronLeftIcon />
      </IconButton>

      <IconButton
        onClick={scrollRight}
        sx={{
          position: "absolute",
          top: "50%",
          right: 16,
          transform: "translateY(-50%)",
          zIndex: 10,
          backgroundColor: "white",
          boxShadow: 3,
        }}
      >
        <ChevronRightIcon />
      </IconButton>

      <Box
        ref={sliderRef}
        sx={{
          display: "flex",
          overflowX: "scroll",
          scrollSnapType: "x mandatory",
          width: "100vw",

          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {slides.map((slide, index) => (
          <Box
            key={index}
            sx={{
              minWidth: "100vw",
              height: 420,
              backgroundColor: slide.color,
              display: "flex",
              alignItems: "center",
              scrollSnapAlign: "start",
            }}
          >
            <Box sx={{ ml: { xs: 2, md: 10 } }}>
              <Card sx={{ width: 380 }}>
                <CardContent>
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    {slide.title}
                  </Typography>

                  <Typography variant="body2" mb={2}>
                    {slide.description}
                  </Typography>

                  <Button variant="contained">
                    Join Course
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default CourseSlider;
