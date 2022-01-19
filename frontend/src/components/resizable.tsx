import "./resizable.css";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical";
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;

  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      minConstraints: [window.innerWidth * 0.1, Infinity],
      maxConstraints: [window.innerWidth * 0.7, Infinity],
      height: 380,
      width: window.innerWidth * 0.313,
      resizeHandles: ["e"],
    };
  } else {
    resizableProps = {
      minConstraints: [Infinity, 40],
      maxConstraints: [Infinity, window.innerHeight * 0.8],
      height: 2000,
      width: Infinity,
      resizeHandles: ["s"],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
