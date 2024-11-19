import { MdFactory } from "react-icons/md";
import { TbDimensions } from "react-icons/tb";
import { useRocketContext } from "../../context/RocketContext";

const RocketManufacture = () => {
  return (
    <section className="w-full bg-slate-200 py-8 dark:bg-slate-800">
      <div className="mx-auto grid w-full grid-cols-1 gap-x-12 gap-y-12 px-4 sm:grid-cols-2 lg:w-3/5 lg:px-0">
        <ManufacturerDisplay />
        <RocketDimensions />
      </div>
    </section>
  );
};

export default RocketManufacture;

const ManufacturerDisplay = () => {
  const { rocket } = useRocketContext();

  return (
    <div className="flex flex-col items-center justify-between gap-y-12 rounded-md bg-slate-100 p-4 transition-all hover:shadow-lg dark:bg-slate-900">
      <div className="flex items-center space-x-4">
        <MdFactory size={20} />
        <h2 className="text-2xl font-semibold">Manufacturer</h2>
      </div>
      <img src={rocket.agency.image_url} alt={rocket.agency.name} />
      <p className="text-xl">{rocket.agency.name}</p>
    </div>
  );
};

const RocketDimensions = () => {
  const { rocket } = useRocketContext();

  return (
    <div className="flex flex-col items-center justify-between gap-y-12 rounded-md bg-slate-100 p-4 transition-all hover:shadow-lg dark:bg-slate-900">
      <div className="flex items-center space-x-4">
        <TbDimensions size={20} />
        <h2 className="text-2xl font-semibold">Dimensions</h2>
      </div>
      <div className="my-1 self-start px-4 text-start">
        {Object.entries(rocket.dimensions).map(([key, value]) => {
          let displayValue: any = value;

          if (key === "diameter" || key === "length") {
            displayValue = `${value} m`;
          } else if (key === "mass") {
            displayValue = `${value} T`;
          } else if (key === "thrust") {
            displayValue = `${value} kN`;
          }

          return (
            <div key={key} className="space-x-2 text-lg">
              <span className="font-bold capitalize">{key}:</span>
              <span>{displayValue}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};