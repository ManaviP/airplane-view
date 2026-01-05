import React, { Suspense, useState, useEffect, useRef } from "react";
import { OrbitControls, Html,Text} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import Cabin1 from "./Cabin1";
import Cabin3 from "./Cabin3";
import LongFloor from "./LongFloor";
import Roof from "./Roof";
import BackWall from "./BackWall";
import FrontWall from "./FrontWall";
import CameraRig from "./CameraRig";
import seats from "./seats.json";
import OverheadBin from "./OverheadBin";

/* ================= CAMERA MAP ================= */
const cameraViews = {
    default: { pos: [1.8, 1.2, 3.2], look: [0.7, 0.5, 0] },
    middle_col: { pos: [-0.42, 0.9, -2.3], look: [-0.39, 0.88, -2.21] },
    window_seat: { pos: [-1.6, 0.97, -1.03], look: [-1.61, 0.97, -0.93] },
    middle_aisle: { pos: [-1, 1.2, -3.5], look: [-1.01, 1.19, -3.6] },
    end_aisle: { pos: [-1.7, 0.99, -6.9], look: [-1.7, 0.99, -6.8] },
    middle_seat: { pos: [0.5, 0.95, -2.4], look: [0.53, 0.93, -2.31] },
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
    const middleCabinBase = [0.68, 0.35, 1.45];
    const rightCabinBase = [-0.4, 0.4, 1.9];

    /* ================= SEAT DATA (ONLY 3 VIEWS) ================= */
    const selectedSeat = seats.find(
        (s) =>
            s.view === view &&
            (view === "window_seat" ||
                view === "middle_seat" ||
                view === "middle_col")
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
                <LongFloor position={[-0.55, 0.32, -2.2]} rotation={[0, 0.35, 0]} />
                <Roof position={[-0.6, 1.46, -2.3]} rotation={[0, 0.35, 0]} />
                {/* FLOATING OVERHEAD BIN – LEFT SIDE */}
                <OverheadBin
                    position={[-0.95,1.4,-0.75]}
                    rotation={[0, 0.35, 0]}
                    scale={[0.35, 0.12, 16.8]}
                />

                <OverheadBin
                    position={[1.3,1.4,-0.2]}   // same for now
                    rotation={[0, Math.PI + 0.35, 0]}
                    scale={[0.35, 0.12, 20.9]}
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
                        key={`mid-${i}`}
                        position={[
                            middleCabinBase[0] - i * 0.82,
                            middleCabinBase[1],
                            middleCabinBase[2] - i * 2.3,
                        ]}
                        scale={7.5}
                        rotation={[0, 0.35, 0]}
                    >
                        <Cabin3 />

                        {/* MANUAL SEAT LABELS – FIRST CABIN ONLY */}
                        {i === 0 && (
                            <>
                                <SeatLabel label="B13" position={[0.036, 0.077, 0.15]} />
                                <SeatLabel label="B12" position={[0.015, 0.077, 0.15]} />
                                <SeatLabel label="B11" position={[-0.006, 0.077, 0.15]} />

                                <SeatLabel label="B23" position={[0.036, 0.077, 0.10]} />
                                <SeatLabel label="B22" position={[0.015, 0.077, 0.10]} />
                                <SeatLabel label="B21" position={[-0.006, 0.077, 0.10]} />

                                <SeatLabel label="B33" position={[0.036, 0.077, 0.05]} />
                                <SeatLabel label="B32" position={[0.015, 0.077, 0.05]} />
                                <SeatLabel label="B31" position={[-0.006, 0.077, 0.05]} />

                                <SeatLabel label="B43" position={[0.036, 0.077, 0.00]} />
                                <SeatLabel label="B42" position={[0.015, 0.077, 0.00]} />
                                <SeatLabel label="B41" position={[-0.006, 0.077, 0.00]} />

                                <SeatLabel label="B53" position={[0.036, 0.077, -0.05]} />
                                <SeatLabel label="B52" position={[0.015, 0.077, -0.05]} />
                                <SeatLabel label="B51" position={[-0.006, 0.077, -0.05]} />

                                <SeatLabel label="B63" position={[0.036, 0.077, -0.10]} />
                                <SeatLabel label="B62" position={[0.015, 0.077, -0.10]} />
                                <SeatLabel label="B61" position={[-0.006, 0.077, -0.10]} />
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
                                    <SeatLabel label="C23" position={[0.06, 0.07, 0.08]}/>
                                    <SeatLabel label="C22" position={[0.035, 0.07, 0.08]}/>
                                    <SeatLabel label="C21" position={[0.017, 0.07, 0.08]}/>

                                    <SeatLabel label="C33" position={[0.06, 0.07, 0.025]}/>
                                    <SeatLabel label="C32" position={[0.036, 0.07, 0.025]}/>
                                    <SeatLabel label="C31" position={[0.013, 0.07, 0.025]}/>

                                    <SeatLabel label="C43" position={[0.06, 0.07, -0.03]}/>
                                    <SeatLabel label="C42" position={[0.036, 0.07, -0.032]}/>
                                    <SeatLabel label="C41" position={[0.013, 0.07, -0.03]}/>

                                    <SeatLabel label="C53" position={[0.06, 0.07, -0.09]}/>
                                    <SeatLabel label="C52" position={[0.032, 0.07, -0.099]}/>
                                    <SeatLabel label="C51" position={[0.006, 0.07, -0.098]}/>


                                </>

                            </group>
                        )}
                    </group>
                ))}




                <BackWall
                    position={[-3.25, 0.98, -9.33]}
                    rotation={[0, Math.PI + 0.35, 0]}
                    scale={[0.32, 0.18, 0.5]}
                />
                <FrontWall
                    position={[1, 0.98, 2.2]}
                    rotation={[0, 0.35, 0]}
                    scale={[0.32, 0.18, 0.5]}
                />

                {/* HOTSPOTS (ONLY CHANGE: LETTER INSIDE BALL) */}
                <mesh position={[-0.42, 1, -2]} onClick={() => setView("middle_col")}>
                    <sphereGeometry args={[0.12, 24, 24]} />
                    <meshStandardMaterial color="blue" emissive="blue" />
                    <Html center style={{ pointerEvents: "none" }}>
                        <div style={{ fontSize: "19px", fontWeight: "900", color: "white" }}>A</div>
                    </Html>
                </mesh>

                <mesh position={[-1.7, 1.1, -1.03]} onClick={() => setView("window_seat")}>
                    <sphereGeometry args={[0.12, 24, 24]} />
                    <meshStandardMaterial color="green" emissive="green" />
                   <Html center style={{ pointerEvents: "none" }}>
                        <div style={{ fontSize: "19px", fontWeight: "900", color: "white" }}>W</div>
                    </Html>
                </mesh>

                <mesh position={[0.5, 1.1, -2.4]} onClick={() => setView("middle_seat")}>
                    <sphereGeometry args={[0.12, 24, 24]} />
                    <meshStandardMaterial color="cyan" emissive="cyan" />
                    <Html center style={{ pointerEvents: "none" }}>
                        <div style={{ fontSize: "19px", fontWeight: "900", color: "white" }}>M</div>
                    </Html>
                </mesh>

                {/* OTHER HOTSPOTS (UNCHANGED) */}
                <mesh position={[-1, 1.35, -3.5]} onClick={() => setView("middle_aisle")}>
                    <sphereGeometry args={[0.12, 16, 16]} />
                    <meshStandardMaterial color="red" emissive="red" />
                </mesh>

                <mesh position={[-1.3, 1.2, -7.1]} onClick={() => setView("end_aisle")}>
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
