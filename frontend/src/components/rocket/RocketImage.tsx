import { useEffect, useState } from "react";
import { useRocketContext } from "../../context/RocketContext";
import { cn } from "../../lib/utils";

const RocketImage = () => {
  const { rocket } = useRocketContext();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-[calc(100vh-5rem)] w-screen">
      <img
        src={rocket.image_url}
        alt={rocket.name}
        className={cn(
          "h-full w-full object-cover transition-all duration-1000 ease-out",
          {
            "translate-y-0 opacity-100": isVisible,
            "translate-y-10 opacity-0": !isVisible,
          }
        )}
      />
      <div
        className={cn(
          "absolute left-1/2 top-1/2 mt-[-2.5rem] -translate-x-1/2 -translate-y-1/2 text-center transition-all delay-200 duration-1000 ease-out",
          {
            "translate-y-0 opacity-100": isVisible,
            "translate-y-10 opacity-0": !isVisible,
          }
        )}
      >
        <h2 className="mb-4 text-7xl font-bold">{rocket.name}</h2>
        <p className="text-balance text-4xl">{rocket.description}</p>
      </div>
    </div>
  );
};

export default RocketImage;
