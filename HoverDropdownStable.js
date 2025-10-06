"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  MenuItem,
  Typography,
  ClickAwayListener,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const menuData = [
  {
    label: "Network Reliability",
    children: [{ label: "Option 1" }, { label: "Option 2" }],
  },
  {
    label: "VDG",
    children: [
      {
        label: "Success Based",
        children: [{ label: "Public Sector" }, { label: "Private Sector" }],
      },
    ],
  },
  {
    label: "Coverage",
    children: [{ label: "Urban" }, { label: "Rural" }],
  },
];

export default function HoverDropdownStable() {
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState([]);
  const [selected, setSelected] = useState(null);

  const maxDepth = 3; // define how many levels to render

  const getLevelData = (data, index) => {
    if (index === 0) return data;
    let current = data.find((i) => i.label === path[0]);
    for (let i = 1; i < index; i++) {
      current = current?.children?.find((j) => j.label === path[i]);
    }
    return current?.children || [];
  };

  const handleHover = (label, level, hasChildren) => {
    // update path, but don't close or reset dropdown
    const newPath = [...path.slice(0, level), label];
    setPath(newPath);
  };

  const handleFinalSelect = (label, level) => {
    const newPath = [...path.slice(0, level), label];
    setSelected(newPath.join(" → "));
    setOpen(false);
  };

  const handleOpen = () => setOpen((prev) => !prev);
  const handleClose = () => {
    setOpen(false);
    setPath([]);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box sx={{ position: "relative", display: "inline-block", width: "100%" }}>
        <Button
          variant="outlined"
          fullWidth
          onClick={handleOpen}
          sx={{
            justifyContent: "space-between",
            minWidth: 280,
            textTransform: "none",
          }}
        >
          {selected || "Select Rationale"}
        </Button>

        {open && (
          <Paper
            sx={{
              mt: 1,
              p: 1,
              display: "flex",
              flexWrap: "nowrap",
              borderRadius: 2,
              boxShadow: 4,
              minHeight: 120,
              overflowX: "auto",
              transition: "all 0.2s ease",
              zIndex: 10,
            }}
          >
            {[...Array(maxDepth)].map((_, level) => {
              const items = getLevelData(menuData, level);
              if (!items?.length) return null;

              return (
                <Box
                  key={level}
                  sx={{
                    minWidth: 200,
                    flex: "0 0 auto",
                    borderRight:
                      level < maxDepth - 1
                        ? "1px solid rgba(0,0,0,0.1)"
                        : "none",
                    pr: 1,
                  }}
                >
                  {items.map((item) => (
                    <MenuItem
                      key={item.label}
                      onMouseEnter={() =>
                        handleHover(item.label, level, !!item.children)
                      }
                      onClick={() => {
                        if (!item.children) handleFinalSelect(item.label, level);
                      }}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        backgroundColor:
                          path[level] === item.label
                            ? "action.selected"
                            : "transparent",
                        borderRadius: 1,
                        mb: 0.5,
                        "&:hover": {
                          backgroundColor: "action.hover",
                        },
                        cursor: "pointer",
                      }}
                    >
                      <Typography variant="body2">{item.label}</Typography>
                      {item.children && <ArrowRightIcon fontSize="small" />}
                    </MenuItem>
                  ))}
                </Box>
              );
            })}
          </Paper>
        )}
      </Box>
    </ClickAwayListener>
  );
}
