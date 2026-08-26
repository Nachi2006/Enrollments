import { ReactNode } from "react";
import "./BoundingBox.css";

interface Props {
  children: ReactNode;
  className?: string;
}

const BoundingBox = ({ children, className = "" }: Props) => {
  return (
  <div
  className={`flex-1 w-full max-w-full min-w-0 min-h-0 h-full mx-auto
  border-2 border-prime p-3 sm:p-4 md:p-8
  relative border-dashed border-spacing-4 md:border-spacing-8
  overflow-hidden flex bg-black ${className}`}
  >
      <div className="pointer-events-none w-full h-full absolute top-0 left-0 border-2 border-prime blur-lg"></div>
      <div className="flex-grow min-w-0">{children}</div>
    </div>
  );
};

export default BoundingBox;
