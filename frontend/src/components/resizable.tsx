import "./resizable.css";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

interface ResizableProps {
  direction:
    | "horizontal"
    | "vertical-down"
    | "vertical-up"
    | "horizontal-react"
    | "vertical-react";
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;

  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      minConstraints: [window.innerWidth * 0.1, Infinity],
      maxConstraints: [window.innerWidth * 0.73, Infinity],
      height: 470,
      width: window.innerWidth * 0.313,
      resizeHandles: ["e"],
    };
  } else if (direction === "horizontal-react") {
    resizableProps = {
      className: "resize-horizontal react",
      minConstraints: [window.innerWidth * 0.2, Infinity],
      maxConstraints: [window.innerWidth * 0.75, Infinity],
      height: Infinity,
      width: 700,
      resizeHandles: ["e"],
      //   onResizeStop: (event, data) => {
      //     setWidth(data.size.width);
      //   },
    };
  } else if (direction === "vertical-react") {
    resizableProps = {
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      height: 200,
      width: 1287,
      resizeHandles: ["s"],
    };
  } else if (direction === "vertical-down") {
    resizableProps = {
      minConstraints: [Infinity, 70],
      maxConstraints: [Infinity, window.innerHeight * 0.81],
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
