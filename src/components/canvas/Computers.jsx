/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Computers = ({ isMobile }) => {
	// const computer = useGLTF("./desktop_pc/scene.gltf");
	const computer = useLoader(GLTFLoader ,"./desktop_pc/scene.gltf")

	return (
		<>
			<mesh>
				<hemisphereLight intensity={0.2} groundColor={"black"} />
				<pointLight
					intensity={isMobile ? 25 : 50}
					position={isMobile ? [-2, -1, -1] : [-2, -2, -1]}
				/>
				<spotLight
					position={isMobile ? [-3, 4, 7] : [-3, 5, 3]}
					angle={9}
					penumbra={4}
					intensity={isMobile ? 400 : 500}
					castShadow
					shadow-mapSize={1024}
				/>
				<primitive
				
					object={computer.scene}
					scale={isMobile ? 1.5 : 2}
					position={isMobile ? [-2, -7, -2] : [-4, -10, -2]}
					rotation={[-0.01, -0.25, 0.0]}
				/>
			</mesh>
		</>
	);
};

const ComputersCanvas = () => {
	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width:580px)");

		setIsMobile(mediaQuery.matches);

		const handleMediaQueryChange = (event) => {
			setIsMobile(event.matches);
		};
		mediaQuery.addEventListener("change", handleMediaQueryChange);
		return () => {
			mediaQuery.addEventListener("change", handleMediaQueryChange);
		};
	}, []);

	return (
		<>
			<Canvas
			
				frameloop="demand"
				shadows
				camera={{ position: [20, 3, 5], fav: 25 }}
				gl={{ preserveDrawingBuffer: true }}
			>
				<Suspense fallback={<CanvasLoader />}>
					<OrbitControls
						enableZoom={false}
						maxPolarAngle={Math.PI / 2}
						minPolarAngle={Math.PI / 2}
					/>

					<Computers isMobile={isMobile} />
				</Suspense>

				<Preload all />
			</Canvas>
		</>
	);
};

export default ComputersCanvas;
