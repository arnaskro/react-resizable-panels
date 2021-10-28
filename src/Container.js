import React, { useCallback, useEffect, useState, useMemo } from "react";
import { Wrapper, DragHandle } from "./styles";
import ResizablePanel from "./ResizablePanel";
import { v4 as uuid } from "uuid";

const initialWidths = { box1: 0, box2: 0, box3: 100 };

function Container({ children }) {
  const [state, setState] = useState(initialWidths);
  const [activeHandle, setActiveHandle] = useState();
  const { panelKeys, handleKeys } = useMemo(() => {
    return {
      panelKeys: new Array(children.length).fill(null).map(() => uuid()),
      handleKeys:
        children.length > 1
          ? new Array(children.length - 1).fill(null).map(() => uuid())
          : []
    };
  }, [children.length]);

  const onMouseDown = useCallback(
    ([key1, key2], handleKey) => () => {
      setActiveHandle(handleKey);
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
        setActiveHandle();
      });
    },
    [setState, setActiveHandle]
  );

  useEffect(() => {
    const handleResize = () => setState(initialWidths);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setState]);

  const content = children.map((el, i) => {
    const key = panelKeys[i];
    const panel = (
      <ResizablePanel
        key={key}
        setInitialWidth={(newWidth) =>
          setState((state) => ({ ...state, [key]: newWidth }))
        }
        width={state[key]}
      >
        {el}
      </ResizablePanel>
    );

    if (i >= 0 && i < children.length - 1) {
      const handleKey = handleKeys[i];
      const rightPanelKey = panelKeys[i + 1];
      const handle = (
        <DragHandle
          key={handleKey}
          active={activeHandle === handleKey}
          onMouseDown={onMouseDown([key, rightPanelKey], handleKey)}
        />
      );

      return [panel, handle];
    }

    return panel;
  });

  return <Wrapper active={!!activeHandle}>{content}</Wrapper>;
}

export default Container;
