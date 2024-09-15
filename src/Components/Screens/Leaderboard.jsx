// import { Link } from "react-router-dom";
import Heading from "../UI/Heading";
import Layout from "../UI/Layout";
import useProject from "../../Hooks/useProject";
import { storage } from "../../Lib/appwriteConfig";

const Leaderboard = () => {
  const { leaderboard } = useProject();


  return (
    <Layout>
      <div className="main">
        <Heading title="Leaderboard" subtitle="Top techies by number of projects" />
        <div className="my-8 layout">
          <ul className="flex flex-col gap-4">
            {leaderboard.map((user) => (
              <li
               data-aos="fade-right"
                      data-aos-delay="200"
                key={user.userid} className="flex items-center bg-lighter p-2 rounded-xl">
                <div className="flex-1 flex items-center gap-2">
                  <div className="h-14 w-14 bg-blue-400 rounded-full overflow-hidden">
                    <img
                       src={`${
                        user?.image
                          ? storage.getFilePreview("images", user?.image)
                          : `https://api.dicebear.com/9.x/adventurer/svg?seed=${user?.name}`
                      }`}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold font-sora">{user.name}</h3>
                    <span className="role">{user.role}</span>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold font-sora text-xl">{user.count}</h3>
                  <p className="text-sub text-sm">{user.count > 1 ? "Projects":"Project"}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
