import React from "react";

export default function SeatMap({ onNavigate }) {
    const gradientAnimationStyle = `
    @keyframes moveGradient1 {
      0% { transform: translate(0%, 0%); }
      50% { transform: translate(-20%, -10%); }
      100% { transform: translate(0%, 0%); }
    }

    @keyframes moveGradient2 {
      0% { transform: translate(0%, 0%); }
      50% { transform: translate(15%, 10%); }
      100% { transform: translate(0%, 0%); }
    }
  `;

    const cardStyle = {
        width: "340px",
        minHeight: "260px",
        background: "rgba(255,255,255,0.95)",
        borderRadius: "20px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        transition: "all 0.35s ease",
        border: "1px solid rgba(0,0,0,0.05)",
    };

    const handleMouseEnter = (e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 30px 60px rgba(0,0,0,0.2)";
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.12)";
    };

    const layoutBox = {
        width: "22px",
        height: "22px",
        background: "#1976d2",
        borderRadius: "4px",
    };

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                padding: "40px",
            }}
        >
            {/* Inject animations */}
            <style>{gradientAnimationStyle}</style>

            {/* ===== Animated Background Layer 1 (Light Blue) ===== */}
            <div
                style={{
                    position: "absolute",
                    width: "200%",
                    height: "200%",
                    top: "-50%",
                    left: "-50%",
                    background:
                        "radial-gradient(circle at 30% 30%, rgba(144,202,249,0.45), transparent 40%), radial-gradient(circle at 70% 70%, rgba(187,222,251,0.5), transparent 40%)",
                    animation: "moveGradient1 20s ease-in-out infinite",
                }}
            />

            {/* ===== Animated Background Layer 2 (Dark Blue) ===== */}
            <div
                style={{
                    position: "absolute",
                    width: "200%",
                    height: "200%",
                    top: "-50%",
                    left: "-50%",
                    background:
                        "radial-gradient(circle at 20% 80%, rgba(13,71,161,0.35), transparent 45%), radial-gradient(circle at 80% 20%, rgba(30,136,229,0.4), transparent 45%)",
                    animation: "moveGradient2 26s ease-in-out infinite",
                }}
            />

            {/* ===== Content Wrapper ===== */}
            <div style={{ position: "relative", zIndex: 2, width: "100%", textAlign: "center" }}>
                <h1
                    style={{
                        color: "#0d47a1",
                        marginBottom: "16px",
                        fontSize: "2.8rem",
                        fontWeight: "700",
                    }}
                >
                    3D Seat Map View
                </h1>

                <p
                    style={{
                        color: "#455a64",
                        marginBottom: "60px",
                        fontSize: "1.1rem",
                        maxWidth: "720px",
                        textAlign: "center",
                        lineHeight: "1.6",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                >
                    Explore different aircraft cabin configurations in an interactive 3D
                    environment. Choose a layout to visualize seat positioning, spacing, and
                    overall cabin structure.
                </p>

                <div style={{ display: "flex", gap: "60px", flexWrap: "wrap", justifyContent: "center" }}>
                    {/* ================= MODEL 1 ================= */}
                    <div
                        style={cardStyle}
                        onClick={() => onNavigate("model1")}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div>
                            <h2 style={{ color: "#0d47a1", marginBottom: "6px" }}>Model 1</h2>
                            <p style={{ color: "#607d8b", marginBottom: "14px" }}>
                                Full Cabin Layout
                            </p>

                            <p
                                style={{
                                    color: "#37474f",
                                    fontSize: "0.95rem",
                                    lineHeight: "1.5",
                                    marginBottom: "16px",
                                }}
                            >
                                This layout features <strong>3 main seat columns</strong>, and each
                                column contains <strong>3 seats per row</strong>. It represents a
                                standard full-capacity aircraft cabin configuration.
                            </p>

                            {/* Mini layout preview */}
                            <div style={{ display: "flex", gap: "12px" }}>
                                {[1, 2, 3].map((col) => (
                                    <div
                                        key={col}
                                        style={{ display: "flex", flexDirection: "column", gap: "6px" }}
                                    >
                                        <div style={layoutBox} />
                                        <div style={layoutBox} />
                                        <div style={layoutBox} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            style={{
                                marginTop: "20px",
                                color: "#1976d2",
                                fontWeight: "600",
                                fontSize: "0.9rem",
                            }}
                        >
                            View Full Cabin →
                        </div>
                    </div>

                    {/* ================= MODEL 2 ================= */}
                    <div
                        style={cardStyle}
                        onClick={() => onNavigate("model2")}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div>
                            <h2 style={{ color: "#0d47a1", marginBottom: "6px" }}>Model 2</h2>
                            <p style={{ color: "#1b7baa", marginBottom: "14px" }}>
                                Split Cabin Layout
                            </p>

                            <p
                                style={{
                                    color: "#37474f",
                                    fontSize: "0.95rem",
                                    lineHeight: "1.5",
                                    marginBottom: "16px",
                                }}
                            >
                                This layout features <strong>2 main seat columns</strong>, and each
                                column contains <strong>3 seats per row</strong>. It is ideal for
                                showcasing wider aisles and a more open cabin feel.
                            </p>

                            {/* Mini layout preview */}
                            <div style={{ display: "flex", gap: "12px" }}>
                                {[1, 2].map((col) => (
                                    <div
                                        key={col}
                                        style={{ display: "flex", flexDirection: "column", gap: "6px" }}
                                    >
                                        <div style={layoutBox} />
                                        <div style={layoutBox} />
                                        <div style={layoutBox} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            style={{
                                marginTop: "20px",
                                color: "#1976d2",
                                fontWeight: "600",
                                fontSize: "0.9rem",
                            }}
                        >
                            View Split Cabin →
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
