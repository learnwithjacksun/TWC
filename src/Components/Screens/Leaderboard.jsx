import Heading from "../UI/Heading";
import Layout from "../UI/Layout";
import useProject from "../../Hooks/useProject";
import { storage } from "../../Lib/appwriteConfig";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useTheme from "../../Hooks/useTheme";

const Leaderboard = () => {
  const { darkMode } = useTheme();
  const { leaderboard, loading } = useProject();

  return (
    <Layout>
      <div className="main">
        <Heading title="Leaderboard" subtitle="Top techies by number of projects" />
        <div className="my-8 layout">
          <ul className="flex flex-col gap-4">
          {loading && (
                  <>
                    {Array(6)
                      .fill()
                      .map((_, idx) => (
                        <Skeleton
                          key={idx}
                          baseColor={darkMode ? "#303030" : "#fefefe"}
                          highlightColor={darkMode ? "#444" : "#fff"}
                          style={{
                            minHeight: "70px",
                            borderRadius: "16px",
                          }}
                        />
                      ))}
                  </>
                )}
            {leaderboard.map((user) => (
              <li
               data-aos="fade-up"
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
