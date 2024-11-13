import { BarLoader } from "react-spinners";

type LoadingProps = {
  text?: string;
};

const Loading = ({ text }: LoadingProps) => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <BarLoader color="#de670d" />
      {text && <p>{text}</p>}
    </div>
  );
};

export default Loading;
