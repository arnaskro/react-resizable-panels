import { styled } from "@stitches/react";

export const Wrapper = styled("div", {
  height: "90vh",
  width: "90vw",
  background: "rgb(66 69 86)",
  padding: "1rem",
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  variants: {
    resizeIsActive: {
      true: {
        cursor: "col-resize"
      }
    }
  }
});

export const Box = styled("div", {
  position: "relative",
  height: "90%",
  width: "100%",
  background: "rgb(47 49 56)",
  border: "1px solid #777bd5",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem",
  flexDirection: "column"
});

export const DragHandle = styled("div", {
  position: "relative",
  height: "100%",
  "&:after": {
    content: "",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "-3px",
    width: "6px",
    background: "transparent",
    cursor: "col-resize",
    transiton: "all 50ms",
    zIndex: 100
  },

  "&:hover": {
    "&:after": {
      background: "green"
    }
  },

  variants: {
    active: {
      true: {
        "&:after": {
          background: "red !important"
        }
      }
    }
  }
});
