import { useEffect, useRef, useState } from "react";
import { ResizablePanelStyle } from "./styles";

function ResizablePanel({ children, width, setInitialWidth }) {
  const [initialized, setInitialized] = useState(false);
  const ref = useRef();

  // initialize widths
  useEffect(() => {
    if (ref.current && !initialized) {
      setInitialWidth(ref.current.offsetWidth);
      setInitialized(true);
    }
  }, [ref, setInitialWidth, setInitialized, initialized]);

  // if window is resized, reinitialize
  useEffect(() => {
    const handleResize = () => {
      if (initialized && width === 0) {
        setInitialized(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setInitialized, width, initialized]);

  return (
    <ResizablePanelStyle
      ref={ref}
      css={{ width: width ? `${width}px` : "100%" }}
    >
      {children}
    </ResizablePanelStyle>
  );
}

export default ResizablePanel;
