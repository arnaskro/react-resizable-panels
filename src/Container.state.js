import { useCallback, useEffect, useState, useMemo } from "react";
import { v4 as uuid } from "uuid";

function useContainerState({ children, minWidth }) {
  const [widths, setWidths] = useState({});
  const [activeHandle, setActiveHandle] = useState();

  // Generate keys
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

        setWidths((x) => {
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
    [setWidths, setActiveHandle, minWidth]
  );

  useEffect(() => {
    const handleResize = () => setWidths({});
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setWidths]);

  return {
    panelKeys,
    handleKeys,
    onMouseDown,
    activeHandle,
    setWidths,
    widths
  };
}

export default useContainerState;
