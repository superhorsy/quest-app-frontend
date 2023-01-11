import React from "react";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

export const LinksFooter = ({ linksData }) => {
  return (
    <Box
      sx={{
        width: 1,
        minHeight: 60,
        display: "flex",
        height: "auto",
        position: "absolute",
        bottom: {xs: -60, xl: 0},
        left: 0,
        right: 0,
        backgroundColor: "primary.main",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          m: "0 auto",
          width: 1,
          maxWidth: 1536,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {linksData &&
          linksData.map((item, ind) => (
            <Link
              key={ind}
              underline="none"
              sx={{ color: "secondary.main", fontSize: {xs: 12, ms: 16} }}
              rel="noopener"
              target="_blank"
              href={item.linkUrl}
              title={item.linkTitle}
            >
              {item.linkText}
            </Link>
          ))}
      </Box>
    </Box>
  );
};
