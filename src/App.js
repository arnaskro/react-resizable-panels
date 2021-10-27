import React, { useCallback, useState } from "react";
import { Wrapper, DragHandle } from "./styles";
import Panel from "./Panel";

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
