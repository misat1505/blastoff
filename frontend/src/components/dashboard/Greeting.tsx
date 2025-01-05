import { useSessionContext } from "@/context/SessionContext";

const Greeting = () => {
  const { user } = useSessionContext();

  return (
    <div className="flex items-center justify-between space-x-4">
      <div>
        <h2 className="font-semibold text-2xl">
          Welcome back, {user?.username}!
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Explore your followed agencies, launches, and personalized information
          here.
        </p>
      </div>
      <div className="text-sm text-muted-foreground">
        Member since {new Date(user!.created_at).toLocaleDateString()}
      </div>
    </div>
  );
};

export default Greeting;
