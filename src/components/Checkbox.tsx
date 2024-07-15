import React from "react";
import { motion } from "framer-motion";

const Checkbox = ({
  onchange = () => {},
  value,
}: {
  onchange?: (val: boolean) => void;
  value: boolean;
}) => {
  const [state, setState] = React.useState(value);
  const handleClick = (val: boolean) => {
    setState(val);
    onchange(val);
  };
  const variants = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0.8 },
  };
  return (
    <div className="checkbox" onClick={() => handleClick(!state)}>
      <motion.div
        initial={value ? "visible" : "hidden"}
        variants={variants}
        animate={state ? "visible" : "hidden"}
        transition={{ stiffness: 600, damping: 10, duration: 0.1 }}
        className="inner"
      >
        <svg
          width="50%"
          height="50%"
          viewBox="0 0 18 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.6833 0.65C15.8167 -0.216667 14.5167 -0.216667 13.65 0.65L6.5 7.8L3.68333 4.98333C2.81667 4.11667 1.51667 4.11667 0.65 4.98333C-0.216667 5.85 -0.216667 7.15 0.65 8.01667L4.98333 12.35C5.41667 12.7833 5.85 13 6.5 13C7.15 13 7.58333 12.7833 8.01667 12.35L16.6833 3.68333C17.55 2.81667 17.55 1.51667 16.6833 0.65Z"
            fill="#fff"
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default Checkbox;
