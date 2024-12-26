import FollowedCount from "@/components/dashboard/FollowedCount";
import Greeting from "@/components/dashboard/Greeting";
import ProfileSettings from "@/components/dashboard/Settings";

const ProfilePage = () => {
  return (
    <div className="w-1/2 mx-auto p-2 mt-4">
      <Greeting />
      <ProfileSettings />
      <FollowedCount />
    </div>
  );
};

export default ProfilePage;
