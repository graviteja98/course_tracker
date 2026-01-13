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

const courses = [
  {
    title: "Complete React Bootcamp",
    tutor: "Akshay Saini",
    rating: 4.6,
    price: 999,
    downloadable: true,
    certificate: true,
    color: "#E3F2FD",
  },
  {
    title: "JavaScript Mastery",
    tutor: "Hitesh Choudhary",
    rating: 4.5,
    price: 799,
    downloadable: false,
    certificate: true,
    color: "#E8F5E9",
  },
  {
    title: "Node.js API Development",
    tutor: "Maximilian",
    rating: 4.7,
    price: 1199,
    downloadable: true,
    certificate: false,
    color: "#FFF3E0",
  },
  {
    title: "System Design Basics",
    tutor: "Gaurav Sen",
    rating: 4.8,
    price: 1499,
    downloadable: false,
    certificate: true,
    color: "#FCE4EC",
  },
  {
    title: "CSS for Developers",
    tutor: "Kevin Powell",
    rating: 4.4,
    price: 599,
    downloadable: true,
    certificate: true,
    color: "#E1F5FE",
  },
  {
    title: "TypeScript Essentials",
    tutor: "Basarat",
    rating: 4.6,
    price: 899,
    downloadable: false,
    certificate: false,
    color: "#F3E5F5",
  },
  {
    title: "Next.js in Depth",
    tutor: "Lee Robinson",
    rating: 4.7,
    price: 1299,
    downloadable: true,
    certificate: true,
    color: "#E0F2F1",
  },
  {
    title: "Docker & DevOps",
    tutor: "Bret Fisher",
    rating: 4.5,
    price: 1099,
    downloadable: false,
    certificate: true,
    color: "#FFFDE7",
  },
  {
    title: "Python for Data Science",
    tutor: "Jose Portilla",
    rating: 4.6,
    price: 1399,
    downloadable: true,
    certificate: false,
    color: "#EDE7F6",
  },
];

function BasedOnInterest() {
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
      {/* Heading */}
      <Typography variant="h5" fontWeight={600} mb={2}>
        Based on interest
      </Typography>

      <Box sx={{ position: "relative" }}>
        {/* Left Button */}
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

        {/* Right Button */}
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

        {/* Cards Carousel */}
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

                {/* Title */}
                <Typography fontWeight={600} fontSize={14} gutterBottom>
                  {course.title}
                </Typography>

                {/* Tutor */}
                <Typography fontSize={12} color="text.secondary">
                  {course.tutor}
                </Typography>

                {/* Rating */}
                <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                  <StarIcon sx={{ color: "#f4c150", fontSize: 16 }} />
                  <Typography fontSize={12} ml={0.5}>
                    {course.rating}
                  </Typography>
                </Box>

                {/* Price */}
                <Typography fontWeight={600} mt={1}>
                  ₹{course.price}
                </Typography>

                {/* Badges */}
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

export default BasedOnInterest;
