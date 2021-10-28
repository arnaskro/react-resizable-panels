import { styled } from "@stitches/react";

export const ContainerWrapper = styled("div", {
  height: "100%",
  width: "100%",
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "stretch",
  variants: {
    active: {
      true: {
        cursor: "col-resize !important"
      }
    }
  }
});

export const PanelWrapper = styled("div", {
  position: "relative",
  flex: "auto"
});

export const DragHandle = styled("div", {
  position: "relative",
  flex: "auto",
  "&:after": {
    content: "",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "-1px",
    width: "2px",
    background: "#d5ce0a44",
    cursor: "col-resize",
    transiton: "all 50ms",
    zIndex: 100000
  },

  "&:hover": {
    "&:after": {
      left: "-3px",
      width: "6px",
      background: "#d5ce0a75"
    }
  },

  variants: {
    active: {
      true: {
        "&:after": {
          left: "-3px",
          width: "6px",
          background: "#d5ce0a !important"
        }
      }
    }
  }
});
