import { MdFactory } from "react-icons/md";
import { TbDimensions } from "react-icons/tb";
import { useRocketContext } from "@/context/RocketContext";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import FavouriteAgencyDisplay from "../FavouriteAgencyDisplay";

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
    <div className="relative flex h-full flex-col items-center justify-between gap-y-12 rounded-md border border-slate-300 bg-slate-100 p-4 transition-all hover:shadow-lg dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center space-x-4">
        <MdFactory size={20} />
        <h2 className="text-2xl font-semibold">Manufacturer</h2>
      </div>
      <img
        src={rocket.agency.image_url || undefined}
        alt={rocket.agency.name || undefined}
        className="max-h-12"
      />
      <p className="text-xl">{rocket.agency.name}</p>
      <div className="absolute top-4 right-4">
        <FavouriteAgencyDisplay agency={rocket.agency} />
      </div>
    </div>
  );
};

const RocketDimensions = () => {
  const { rocket } = useRocketContext();

  const dimensions = [
    { label: "diameter", value: rocket.diameter, unit: "m" },
    { label: "height", value: rocket.height, unit: "m" },
    { label: "mass", value: rocket.mass, unit: "T" },
    { label: "stages", value: rocket.no_stages, unit: "" },
    { label: "thrust", value: rocket.rocket_thrust, unit: "kN" },
  ];

  return (
    <div className="flex h-full flex-col items-center justify-between gap-y-12 rounded-md border border-slate-300 bg-slate-100 p-4 transition-all hover:shadow-lg dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center space-x-4">
        <TbDimensions size={20} />
        <h2 className="text-2xl font-semibold">Dimensions</h2>
      </div>
      <div className="my-1 self-start px-4 text-start">
        {dimensions.map((dimension, idx) => (
          <DimensionItem key={idx} {...dimension} />
        ))}
      </div>
    </div>
  );
};

type DimensionItemProps = {
  label: string;
  value: number | null;
  unit: string;
};

const DimensionItem = ({ label, value, unit }: DimensionItemProps) => {
  if (value === null) {
    return (
      <div className="text-md space-x-2">
        <span className="font-bold capitalize">{label}:</span>
        <span className="text-muted-foreground">N/A</span>
      </div>
    );
  }

  return (
    <div className="text-md space-x-2">
      <span className="font-bold capitalize">{label}:</span>
      <span className="text-muted-foreground">
        {value} {unit}
      </span>
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
