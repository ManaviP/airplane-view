import React from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";

function App() {
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <Canvas
                camera={{
                    fov: 55,
                    position: [2, 1.5, 4],
                    // Adjusted for your model
                }}
                shadows
            >
                <Scene />
            </Canvas>
        </div>
    );
}

export default App;
