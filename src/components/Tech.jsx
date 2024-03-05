/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
const TechCard = ({ technology, index }) => {
  return (
    <>
      <div className="w-28 h-28 m-2" key={technology.name}>
        <Tilt className="xs:w-[150px] w-full  ">
          <motion.div
            className="w-full green-pink-gradient  p-[1px] rounded-[20px] shadow-card "
            variants={fadeIn("right", "spring", index * 0.5, 0.75)}
          >
            <div className="bg-tertiary rounded-[20px]  h-[150px] flex justify-evenly items-center flex-col">
              <img
                src={technology.icon}
                alt={technology.name}
                className="w-16 h-16 object-contain"
              />

              <h3 className="text-white text-[20px] font-bold text-center">
                {" "}
                {technology.name}{" "}
              </h3>
            </div>
          </motion.div>
        </Tilt>
      </div>
    </>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
const Tech = () => {
  return (
    <>
      <div className="flex flex-row flex-wrap justify-center gap-10">
        {technologies.map((technology, index) => {
          return (
            <>
              <TechCard technology={technology} index={index} />
            </>
          );
        })}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "tech");
