import { MdFactory } from "react-icons/md";
import { TbDimensions } from "react-icons/tb";
import { useRocketContext } from "@/context/RocketContext";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

const RocketManufacture = () => {
  return (
    <section className="w-full bg-slate-200 py-8 dark:bg-slate-800">
      <div className="mx-auto grid w-full grid-cols-1 gap-x-12 gap-y-6 px-4 sm:grid-cols-2 lg:w-3/5 lg:px-0">
        <FadeInWrapper>
          <ManufacturerDisplay />
        </FadeInWrapper>
        <FadeInWrapper>
          <RocketDimensions />
        </FadeInWrapper>
      </div>
    </section>
  );
};

export default RocketManufacture;

const ManufacturerDisplay = () => {
  const { rocket } = useRocketContext();

  return (
    <div className="flex h-full flex-col items-center justify-between gap-y-12 rounded-md border border-slate-300 bg-slate-100 p-4 transition-all hover:shadow-lg dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center space-x-4">
        <MdFactory size={20} />
        <h2 className="text-2xl font-semibold">Manufacturer</h2>
      </div>
      <img
        src={rocket.agency.image_url}
        alt={rocket.agency.name}
        className="max-h-12"
      />
      <p className="text-xl">{rocket.agency.name}</p>
    </div>
  );
};

const RocketDimensions = () => {
  const { rocket } = useRocketContext();

  return (
    <div className="flex h-full flex-col items-center justify-between gap-y-12 rounded-md border border-slate-300 bg-slate-100 p-4 transition-all hover:shadow-lg dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center space-x-4">
        <TbDimensions size={20} />
        <h2 className="text-2xl font-semibold">Dimensions</h2>
      </div>
      <div className="my-1 self-start px-4 text-start">
        {Object.entries(rocket.dimensions).map(([key, value]) => {
          let displayValue: any = value;
          if (displayValue === null)
            return (
              <div key={key} className="text-md space-x-2">
                <span className="font-bold capitalize">{key}:</span>
                <span className="text-muted-foreground">N/A</span>
              </div>
            );

          if (key === "diameter" || key === "length") {
            displayValue = `${value} m`;
          } else if (key === "mass") {
            displayValue = `${value} T`;
          } else if (key === "thrust") {
            displayValue = `${value} kN`;
          }

          return (
            <div key={key} className="text-md space-x-2">
              <span className="font-bold capitalize">{key}:</span>
              <span className="text-muted-foreground">{displayValue}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FadeInWrapper = ({ children }: { children: React.ReactNode }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div
      ref={ref}
      className={cn("transform transition-all duration-1000 ease-out", {
        "translate-x-0 opacity-100": inView,
        "translate-x-10 opacity-0": !inView,
      })}
    >
      {children}
    </div>
  );
};
