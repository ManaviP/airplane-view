import React, { Suspense, useState, useEffect, useRef } from "react";
import { OrbitControls, Html,Text} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import Cabin1 from "../components/Cabin1";
import LongFloor from "../components/LongFloor";
import Roof from "../components/Roof";
import BackWall from "../components/BackWall";
import FrontWall from "../components/FrontWall";
import CameraRig from "../components/CameraRig";
import seats from "../components/seats.json";
import OverheadBin from "../components/OverheadBin";


/* ================= CAMERA MAP ================= */
const cameraViews = {
    default: { pos: [1.8, 1.2, 3.2], look: [0.7, 0.5, 0] },
    window_seat: { pos: [-0.62, 0.97, -1.09], look: [-0.6, 0.97, -0.93] },

    // 👇 taken directly from model1
    middle_seat: { pos: [0.50, 0.93, -2.4], look: [0.52, 0.93, -2.31] },

    middle_aisle: { pos: [-0.56, 0.92, -2.33], look: [-0.5, 0.92, -2.21] },

    end_aisle: { pos: [-1.6, 1, -7.2], look: [-1.5, 0.97, -6.8] },
};


export default function Scene() {
    const [view, setView] = useState("default");
    const controlsRef = useRef();
    const { camera } = useThree();

    /* ================= DEFAULT VIEW ONLY ================= */
    useEffect(() => {
        if (view !== "default") return;
        const { pos, look } = cameraViews.default;
        camera.position.set(...pos);
        camera.lookAt(...look);
        if (controlsRef.current) {
            controlsRef.current.target.set(...look);
            controlsRef.current.update();
        }
    }, [view, camera]);

    /* ================= CABIN CONFIG ================= */
    const TOTAL_SEGMENTS = 5;
    const Z_SPACING = 2.4;
    const leftCabinBase = [1.8, 0.4, 1.1];
    const rightCabinBase = [0.6, 0.4, 1.6];

    /* ================= SEAT DATA (ONLY 3 VIEWS) ================= */
    const selectedSeat = seats.find(
        (s) =>
            s.view === view &&
            (view === "window_seat" || view === "middle_seat" || view === "middle_aisle")
    );


    function SeatLabel({ label = "B1", position = [0, 0, 0] }) {
        return (
            <Text
                position={position}
                font="/fonts/Roboto-Black.ttf"
                fontSize={0.0027}
                color="white"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.001}
                outlineColor="black"
            >
                {label}
            </Text>
        );
    }


    return (
        <>
            <OrbitControls
                ref={controlsRef}
                enabled
                enableRotate={view !== "default"}
                enablePan={view === "default"}
                enableZoom={false}
                enableDamping
                dampingFactor={0.08}
                makeDefault
            />

            <CameraRig
                view={view}
                targetPosition={cameraViews[view].pos}
                targetLookAt={cameraViews[view].look}
                controlsRef={controlsRef}
            />

            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            <Suspense fallback={null}>
                <LongFloor position={[0.45, 0.32, -2.2]} rotation={[0, 0.35, 0]} />
                <Roof position={[0.4, 1.46, -2.3]} rotation={[0, 0.35, 0]} />
                {/* FLOATING OVERHEAD BIN – LEFT SIDE */}
                <OverheadBin
                    position={[-1.4, 1.38, -3.5]}
                    rotation={[0, 0.35, 0]}
                    scale={[0.45, 0.4, 14]}
                />

                <OverheadBin
                    position={[1.4,1.38,-0.7]}   // same for now
                    rotation={[0, Math.PI + 0.35, 0]}
                    scale={[0.45, 0.4, 14]}
                />



                {Array.from({ length: TOTAL_SEGMENTS }).map((_, i) => (
                    <group
                        key={`left-${i}`}
                        position={[
                            leftCabinBase[0] - i * 0.88,
                            leftCabinBase[1],
                            leftCabinBase[2] - i * Z_SPACING,
                        ]}
                        scale={7.8}
                        rotation={[0, 0.35, 0]}
                    >
                        <Cabin1 />

                        {/* SINGLE TEST SEAT – LEFT COLUMN */}
                        {i === 0 && (
                            <>
                                <SeatLabel label="A11" position={[-0.047, 0.0745, 0.15]} />
                                <SeatLabel label="A12" position={[-0.0265, 0.0745, 0.15]} />
                                <SeatLabel label="A13" position={[-0.0060, 0.0745, 0.15]} />

                                <SeatLabel label="A21" position={[-0.047, 0.0745, 0.10]} />
                                <SeatLabel label="A22" position={[-0.0265, 0.0745, 0.10]} />
                                <SeatLabel label="A23" position={[-0.0060, 0.0745, 0.10]} />

                                <SeatLabel label="A31" position={[-0.047, 0.0745, 0.05]} />
                                <SeatLabel label="A32" position={[-0.0265, 0.0745, 0.05]} />
                                <SeatLabel label="A33" position={[-0.0060, 0.0745, 0.05]} />

                                <SeatLabel label="A41" position={[-0.047, 0.0745, 0.00]} />
                                <SeatLabel label="A42" position={[-0.0265, 0.0745, 0.00]} />
                                <SeatLabel label="A43" position={[-0.0060, 0.0745, 0.00]} />

                                <SeatLabel label="A51" position={[-0.047, 0.0745, -0.05]} />
                                <SeatLabel label="A52" position={[-0.0265, 0.0745, -0.05]} />
                                <SeatLabel label="A53" position={[-0.0050, 0.0745, -0.05]} />

                                <SeatLabel label="A61" position={[-0.047, 0.0745, -0.10]} />
                                <SeatLabel label="A62" position={[-0.0255, 0.0745, -0.10]} />
                                <SeatLabel label="A63" position={[-0.0050, 0.0745, -0.10]} />
                            </>




                        )}
                    </group>
                ))}


                {Array.from({ length: TOTAL_SEGMENTS }).map((_, i) => (
                    <group
                        key={`right-${i}`}
                        position={[
                            rightCabinBase[0] - i * 0.87,
                            rightCabinBase[1],
                            rightCabinBase[2] - i * Z_SPACING,
                        ]}
                        scale={[-8, 8, 7.5]}
                        rotation={[0, 0.35, 0]}
                    >
                        <Cabin1 />

                        {/* SINGLE TEST SEAT – RIGHT COLUMN */}
                        {i === 0 && (
                            <group scale={[-1, 1, 1]}>
                                <>
                                   <SeatLabel label="C13" position={[0.037, 0.07, 0.140]} />
                                    <SeatLabel label="C12" position={[0.015, 0.07, 0.14]}/>
                                    <SeatLabel label="C11" position={[-0.008, 0.07, 0.14]}/>
                                    
                                    <SeatLabel label="C23" position={[0.037, 0.07, 0.08]}/>
                                    <SeatLabel label="C22" position={[0.015, 0.07, 0.08]}/>
                                    <SeatLabel label="C21" position={[-0.008, 0.07, 0.08]}/>

                                    <SeatLabel label="C33" position={[0.037, 0.07, 0.025]}/>
                                    <SeatLabel label="C32" position={[0.015, 0.07, 0.025]}/>
                                    <SeatLabel label="C31" position={[-0.008, 0.07, 0.025]}/>

                                    <SeatLabel label="C43" position={[0.037, 0.07, -0.03]}/>
                                    <SeatLabel label="C42" position={[0.015, 0.07, -0.032]}/>
                                    <SeatLabel label="C41" position={[-0.008, 0.07, -0.03]}/>

                                    <SeatLabel label="C53" position={[0.037, 0.07, -0.09]}/>
                                    <SeatLabel label="C52" position={[0.015, 0.07, -0.099]}/>
                                    <SeatLabel label="C51" position={[-0.008, 0.07, -0.098]}/>


                                </>

                            </group>
                        )}
                    </group>
                ))}




                <BackWall
                    position={[-2.25, 0.98, -9.33]}
                    rotation={[0, Math.PI + 0.35, 0]}
                    scale={[0.32, 0.18, 0.5]}
                />
                <FrontWall
                    position={[1, 0.98, 2.2]}
                    rotation={[0, 0.35, 0]}
                    scale={[0.32, 0.18, 0.5]}
                />

                <mesh position={[-0.6, 1.1, -1.03]} onClick={() => setView("window_seat")}>
                    <sphereGeometry args={[0.12, 24, 24]} />
                    <meshStandardMaterial color="green" emissive="green" />
                   <Html center style={{ pointerEvents: "none" }}>
                        <div style={{ fontSize: "19px", fontWeight: "900", color: "white" }}>W</div>
                    </Html>
                </mesh>

                {/* OTHER HOTSPOTS (UNCHANGED) */}
                <mesh position={[0.5, 1.1, -2.4]} onClick={() => setView("middle_seat")}>
                    <sphereGeometry args={[0.12, 24, 24]} />
                    <meshStandardMaterial color="cyan" emissive="cyan" />
                    <Html center style={{ pointerEvents: "none" }}>
                        <div style={{ fontSize: "19px", fontWeight: "900", color: "white" }}>M</div>
                    </Html>
                </mesh>


                <mesh position={[-0.8, 1.15, -3.1]} onClick={() => setView("middle_aisle")}>
                    <sphereGeometry args={[0.12, 16, 16]} />
                    <meshStandardMaterial color="red" emissive="red" />
                    <Html center style={{ pointerEvents: "none" }}>
                        <div style={{ fontSize: "19px", fontWeight: "900", color: "white" }}>A</div>
                    </Html>
                </mesh>



                <mesh position={[-0.4, 1.15, -3.5]} onClick={() => setView("end_aisle")}>
                    <sphereGeometry args={[0.12, 16, 16]} />
                    <meshStandardMaterial color="orange" emissive="orange" />
                </mesh>

                {/* BACK BUTTON */}
                {view !== "default" && (
                    <Html position={[0, 2, 0]} center>
                        <button
                            onClick={() => setView("default")}
                            style={{
                                padding: "8px 16px",
                                fontSize: "14px",
                                borderRadius: "6px",
                                border: "none",
                                cursor: "pointer",
                                background: "#111",
                                color: "#fff",
                                opacity: 0.85,
                            }}
                        >
                            ← Back
                        </button>
                    </Html>
                )}
            </Suspense>

            {/* RIGHT SIDEBAR (UNCHANGED) */}
            {selectedSeat && (
                <Html fullscreen portal={document.body} style={{ pointerEvents: "none" }}>
                    <div
                        style={{
                            position: "fixed",
                            top: "12px",
                            right: "12px",
                            width: "260px",
                            maxHeight: "calc(100vh - 24px)",
                            overflowY: "auto",
                            background: "rgba(0,0,0,0.82)",
                            color: "white",
                            padding: "16px",
                            borderRadius: "12px",
                            pointerEvents: "auto",
                            fontFamily: "Arial, sans-serif",
                        }}
                    >
                        <h3 style={{ marginTop: 0 }}>Seat Details</h3>

                        <div><strong>Seat Number:</strong> {selectedSeat.data.seatNumber}</div>
                        <div><strong>Position:</strong> {selectedSeat.data.position}</div>
                        <div><strong>Class:</strong> {selectedSeat.data.class}</div>
                        <div><strong>Near Lavatory:</strong> {selectedSeat.data.nearLavatory ? "Yes" : "No"}</div>
                        <div><strong>Window Available:</strong> {selectedSeat.data.windowAvailable ? "Yes" : "No"}</div>

                        <button
                            onClick={() => setView("default")}
                            style={{
                                marginTop: "14px",
                                padding: "10px",
                                width: "100%",
                                borderRadius: "6px",
                                border: "none",
                                cursor: "pointer",
                                background: "#1e88e5",
                                color: "#fff",
                                fontWeight: "bold",
                            }}
                        >
                            ← Back to Default
                        </button>
                    </div>
                </Html>
            )}
        </>
    );
}