// components/ParticlesBackground.jsx
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        background: { color: "transparent" },
        particles: {
          number: { value: 25 },
          color: { value: ["#6366f1", "#0ea5e9", "#14b8a6"] }, // Indigo, Sky, Teal
          shape: { type: "circle" },
          opacity: {
            value: 0.2,
            random: true,
          },
          size: {
            value: 15,
            random: { enable: true, minimumValue: 5 },
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            outModes: "out",
          },
        },
      }}
      className="absolute inset-0 z-0"
    />
  );
}
