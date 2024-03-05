/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { styles } from "../style";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { Tilt } from "react-tilt";
import { SectionWrapper } from "../hoc";

const ServiceCard = ({ index, title, icon }) => {
	return (
		<>
			<Tilt className="xs:w-[250px] w-full  ">
				<motion.div
					className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card "
					variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
				>
					<div
						options={{
							max: 45,
							scale: 1,
							speed: 450,
						}}
						className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
					>
						<img src={icon} alt={title} className="w-16 h-16 object-contain" />

						<h3 className="text-white text-[20px] font-bold text-center">
							{" "}
							{title}{" "}
						</h3>
					</div>
				</motion.div>
			</Tilt>
		</>
	);
};
const About = () => {
	return (
		<>
			<motion.div variants={textVariant()}>
				<p className={styles.sectionSubText}>Introduction</p>
				<h2 className={styles.sectionHeadText}>Overview</h2>
			</motion.div>

			<motion.p
				variants={fadeIn("", "", 0.1, 1)}
				className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
			>
				I am a MERN stack developer with a passion for web development. I have
				the following skills and abilities:
				<br />
				Front-end development: I can create attractive and user-friendly web
				pages using HTML, CSS, JavaScript, and various frameworks and libraries
				such as React, Bootstrap, and TailwindCSS. I can implement complex
				functionality and logic using JavaScript, TypeScript, and ES6 features.
				I can also use Figma, Photoshop, Illustrator, and Sass to create and
				edit graphics, icons, logos, and stylesheets for web design.
				<br /> Back-end development: I can design and consume RESTful and
				GraphQL APIs using Express, NestJS, and Node.js to handle data and
				business logic on the server-side. I can work with relational and
				non-relational databases using MySQL, ORM (Sequelize), MongoDB, and ODM
				(Mongoose) to store and manipulate data efficiently and securely.
				Version control and collaboration: I can use Git and GitHub to manage
				version control and collaborate with other developers on projects. I can
				follow best practices and coding standards to ensure quality and
				maintainability of my code.
			</motion.p>

			<div className="mt-20 flex justify-center  flex-wrap gap-10">
				{services.map((service, index) => {
					return (
						<>
							<ServiceCard key={service.title} index={index} {...service} />
						</>
					);
				})}
			</div>
		</>
	);
};

export default SectionWrapper(About ,"about");
