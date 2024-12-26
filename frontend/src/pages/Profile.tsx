import { useSessionContext } from "@/context/SessionContext";

const ProfilePage = () => {
  const { user } = useSessionContext();

  return <div>hello {user?.username}</div>;
};

export default ProfilePage;
