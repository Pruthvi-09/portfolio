import React from "react";
import {Tilt} from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../style";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";


const ServiceCard = ({ index, title, icon }) => (
  <Tilt className="xs:w-[250px] w-full">
    <motion.div
      variants={fadeIn("right", "tween", index * 0.1, 1.0)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      style={{ willChange: 'transform, opacity' }}
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary rounded-[20px] py-5 px-8 sm:px-12 min-h-[280px] flex justify-evenly items-center flex-col"
      >
        <img 
          src={icon} 
          alt={title} 
          className="w-16 h-16 object-contain" 
          loading="lazy"
        />

        <h3 className="text-white text-[18px] sm:text-[20px] font-bold text-center">
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);


const About = () => {
  return (
    <div className="overflow-x-visible px-4 sm:px-0">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[15px] sm:text-[17px] max-w-3xl leading-[26px] sm:leading-[30px]"
      >
        I'm a skilled MERN stack developer with expertise in MongoDB,
        Express.js, React, and Node.js. I also have a strong foundation in Core
        Java, allowing me to build robust and scalable backend solutions. I'm a
        quick learner who collaborates effectively in team environments to
        create efficient, user-friendly applications that solve real-world
        problems. Let's work together to bring your ideas to life!
      </motion.p>

    <div className="mt-20 flex flex-wrap gap-10 justify-center">
        {services.map((service,index)=>(
            <ServiceCard key={service.title} index={index} {...service} />
        ))}
    </div>
    </div>
  );
};

export default SectionWrapper(About, "about");
