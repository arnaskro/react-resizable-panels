import { useEffect, useRef } from "react";
import { Box } from "./styles";

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

export default Panel;
