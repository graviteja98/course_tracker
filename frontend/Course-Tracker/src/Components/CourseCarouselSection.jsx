import React, { useRef } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
} from "@mui/material";

import StarIcon from "@mui/icons-material/Star";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function CourseCarouselSection({ title, courses }) {
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
    <Box sx={{ px: 4, mt: 6 }}>
      {/* Section heading */}
      <Typography variant="h5" fontWeight={600} mb={2}>
        {title}
      </Typography>

      <Box sx={{ position: "relative" }}>
        {/* Left arrow */}
        <IconButton
          onClick={scrollLeft}
          sx={{
            position: "absolute",
            left: -20,
            top: "40%",
            zIndex: 10,
            backgroundColor: "white",
            boxShadow: 2,
          }}
        >
          <ChevronLeftIcon />
        </IconButton>

        {/* Right arrow */}
        <IconButton
          onClick={scrollRight}
          sx={{
            position: "absolute",
            right: -20,
            top: "40%",
            zIndex: 10,
            backgroundColor: "white",
            boxShadow: 2,
          }}
        >
          <ChevronRightIcon />
        </IconButton>

        {/* Cards */}
        <Box
          ref={sliderRef}
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "scroll",

            /* hide scrollbar */
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {courses.map((course, index) => (
            <Card
              key={index}
              sx={{
                minWidth: "20%",
                flexShrink: 0,
                cursor: "pointer",
              }}
            >
              <CardContent>
                {/* Image placeholder */}
                <Box
                  sx={{
                    height: 120,
                    backgroundColor: course.color,
                    borderRadius: 1,
                    mb: 1.5,
                  }}
                />

                <Typography fontWeight={600} fontSize={14} gutterBottom>
                  {course.title}
                </Typography>

                <Typography fontSize={12} color="text.secondary">
                  {course.tutor}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                  <StarIcon sx={{ color: "#f4c150", fontSize: 16 }} />
                  <Typography fontSize={12} ml={0.5}>
                    {course.rating}
                  </Typography>
                </Box>

                <Typography fontWeight={600} mt={1}>
                  ₹{course.price}
                </Typography>

                <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
                  {course.downloadable && (
                    <Chip size="small" label="Downloadable" />
                  )}
                  {course.certificate && (
                    <Chip size="small" label="Certificate" />
                  )}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default CourseCarouselSection;
