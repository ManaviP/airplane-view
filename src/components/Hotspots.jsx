export default function Hotspots({ setView }) {
    return (
        <>
            <mesh
                position={[1, 0, -2]}
                onClick={() => setView("window")}
            >
                <sphereGeometry args={[0.05]} />
                <meshBasicMaterial color="red" />
            </mesh>

            <mesh
                position={[-1, 0, -2]}
                onClick={() => setView("aisle")}
            >
                <sphereGeometry args={[0.05]} />
                <meshBasicMaterial color="blue" />
            </mesh>

            <mesh
                position={[0, 0, 2]}
                onClick={() => setView("door")}
            >
                <sphereGeometry args={[0.05]} />
                <meshBasicMaterial color="green" />
            </mesh>
        </>
    );
}
