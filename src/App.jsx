import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Model1 from "./page/model1";
import Model2 from "./page/model2";
import SeatMap from "./page/seatmap";

function App() {
    const [currentPage, setCurrentPage] = useState("seatmap");

    if (currentPage === "seatmap") {
        return <SeatMap onNavigate={setCurrentPage} />;
    }

    const SceneComponent = currentPage === "model1" ? Model1 : Model2;

    return (
        <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
            {/* Global Back Button */}
            <button
                onClick={() => setCurrentPage("seatmap")}
                style={{
                    position: "absolute",
                    top: "20px",
                    left: "20px",
                    zIndex: 1000,
                    padding: "10px 20px",
                    backgroundColor: "white",
                    color: "#0277bd",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                }}
            >
                ← Home
            </button>

            <Canvas
                camera={{
                    fov: 55,
                    position: [2, 1.5, 4],
                }}
                shadows
            >
                <SceneComponent />
            </Canvas>
        </div>
    );
}

export default App;
