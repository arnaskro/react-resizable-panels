import React from "react";
import { ContainerWrapper, DragHandle } from "./styles";
import Panel from "./Panel";
import useContainerState from "./Container.state";

function Container({ children = [], minWidth = 50 }) {
  const {
    panelKeys,
    handleKeys,
    onMouseDown,
    activeHandle,
    widths,
    setWidths
  } = useContainerState({ children, minWidth });

  const content = !Array.isArray(children)
    ? children
    : children.map((el, i) => {
        const key = panelKeys[i];
        const panel = (
          <Panel
            key={key}
            width={widths[key]}
            setInitialWidth={(width) =>
              setWidths((all) => ({ ...all, [key]: width }))
            }
          >
            {el}
          </Panel>
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

  return <ContainerWrapper active={!!activeHandle}>{content}</ContainerWrapper>;
}

export default Container;
