import { useRocketContext } from "@/context/RocketContext";
import { useThemeContext } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const RocketImage = () => {
  const { rocket } = useRocketContext();
  const { theme } = useThemeContext();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "relative h-[calc(100vh+5rem)] w-screen transition-all duration-1000 ease-out",
        {
          "h-[calc(100vh-5rem)]": isVisible,
        }
      )}
    >
      {rocket.image_url && (
        <img
          src={rocket.image_url || undefined}
          alt={rocket.name}
          className="h-full w-full object-cover transition-all duration-1000 ease-out"
        />
      )}
      <div
        className={cn(
          "absolute left-1/2 top-1/2 z-10 max-h-[calc(100vh-5rem)] w-[80vw] -translate-x-1/2 translate-y-10 overflow-y-hidden text-center text-dark_primary opacity-0 transition-all delay-500 duration-1000 ease-out dark:text-slate-100 md:w-[50vw]",
          {
            "-translate-y-1/2 opacity-100": isVisible,
          }
        )}
        style={{
          textShadow:
            theme === "dark" ? "2px 2px 4px black" : "2px 2px 4px white",
        }}
      >
        <h2 className="mb-4 text-4xl font-bold md:text-7xl">{rocket.name}</h2>
        <p className="text-balance text-2xl md:text-4xl">
          {rocket.description}
        </p>
      </div>
    </div>
  );
};

export default RocketImage;
