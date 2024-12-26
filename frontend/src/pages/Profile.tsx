import FollowedCount from "@/components/dashboard/FollowedCount";
import Greeting from "@/components/dashboard/Greeting";
import { useSessionContext } from "@/context/SessionContext";

const ProfilePage = () => {
  const { user } = useSessionContext();

  return (
    <div className="w-1/2 mx-auto p-2 mt-4">
      <Greeting />
      <FollowedCount />
    </div>
  );
};

export default ProfilePage;
