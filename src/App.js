import { styled } from "@stitches/react";
import React, { useCallback, useEffect, useRef, useState } from "react";

const Wrapper = styled("div", {
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

const Box = styled("div", {
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

const DragHandle = styled("div", {
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

function Panel({ children, width, setInitialWidth }) {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      setInitialWidth(ref.current.offsetWidth);
    }
  }, [ref]);

  return (
    <Box ref={ref} css={{ width: width ? `${width}px` : "100%" }}>
      {children}
    </Box>
  );
}

function App() {
  const [state, setState] = useState({ box1: 0, box2: 0, box3: 100 });
  const [resizeIsActive, setResizeIsActive] = useState();

  const onMouseDown = useCallback(
    ([key1, key2], dragKey) => () => {
      setResizeIsActive(dragKey);
      const onMove = (e) => {
        const { movementX } = e;
        const minWidth = 150;

        setState((x) => {
          // get new sizes
          const firstWidth = x[key1] + movementX;
          const scndWidth = x[key2] - movementX;

          // check constraints
          if (
            (firstWidth < minWidth && firstWidth < x[key1]) ||
            (scndWidth < minWidth && scndWidth < x[key2])
          ) {
            return x;
          }

          return {
            ...x,
            [key1]: firstWidth,
            [key2]: scndWidth
          };
        });
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", () => {
        window.removeEventListener("mousemove", onMove);
        setResizeIsActive();
      });
    },
    [setState, setResizeIsActive]
  );

  return (
    <Wrapper active={!!resizeIsActive}>
      <Panel
        setInitialWidth={(box1) => setState((state) => ({ ...state, box1 }))}
        width={state.box1}
      >
        Box 1 ({state.box1})
      </Panel>
      <DragHandle
        active={resizeIsActive === 1}
        onMouseDown={onMouseDown(["box1", "box2"], 1)}
      />
      <Panel
        setInitialWidth={(box2) => setState((state) => ({ ...state, box2 }))}
        width={state.box2}
      >
        Box 2 ({state.box2})
      </Panel>
      <DragHandle
        active={resizeIsActive === 2}
        onMouseDown={onMouseDown(["box2", "box3"], 2)}
      />
      <Panel
        setInitialWidth={(box3) => setState((state) => ({ ...state, box3 }))}
        width={state.box3}
      >
        Box 3 ({state.box3})
      </Panel>
    </Wrapper>
  );
}

export default App;
