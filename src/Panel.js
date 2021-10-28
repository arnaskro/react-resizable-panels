import { useEffect, useRef } from "react";
import { PanelWrapper } from "./styles";

function Panel({ children, width, setInitialWidth }) {
  const ref = useRef();

  // initialize widths
  useEffect(() => {
    if (ref.current && !width) {
      setInitialWidth(ref.current.offsetWidth);
    }
  }, [ref, setInitialWidth, width]);

  return (
    <PanelWrapper ref={ref} css={{ width: width ? `${width}px` : "100%" }}>
      {children}
    </PanelWrapper>
  );
}

export default Panel;
