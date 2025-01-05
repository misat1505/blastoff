import FollowedCount from "@/components/dashboard/FollowedCount";
import FollowedDisplayer from "@/components/dashboard/FollowedDisplayer";
import Greeting from "@/components/dashboard/Greeting";
import ProfileSettings from "@/components/dashboard/Settings";

const ProfilePage = () => {
  return (
    <div className="w-[calc(100%-1rem)] lg:w-3/4 2xl:w-1/2 mx-auto p-2 mt-4">
      <Greeting />
      <ProfileSettings />
      <FollowedCount />
      <FollowedDisplayer />
    </div>
  );
};

export default ProfilePage;
