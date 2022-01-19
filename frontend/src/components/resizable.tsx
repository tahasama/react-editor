import "./resizable.css";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical-down" | "vertical-up";
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;

  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      minConstraints: [window.innerWidth * 0.1, Infinity],
      maxConstraints: [window.innerWidth * 0.9, Infinity],
      height: 400,
      width: window.innerWidth * 0.313,
      resizeHandles: ["e"],
    };
  } else if (direction === "vertical-down") {
    resizableProps = {
      minConstraints: [Infinity, 70],
      maxConstraints: [Infinity, window.innerHeight * 0.7],
      height: 300,
      width: Infinity,
      resizeHandles: ["s"],
    };
  } else {
    resizableProps = {
      minConstraints: [Infinity, 40],
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      height: 400,
      width: Infinity,
      resizeHandles: ["s"],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;