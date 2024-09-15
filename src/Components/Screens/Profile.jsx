import { Link } from "react-router-dom";
import Heading from "../UI/Heading";
import Icon from "../UI/Icon";
import Layout from "../UI/Layout";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";
import TextArea from "../UI/TextArea";
import { databases } from "../../Lib/appwriteConfig";
import ImageInput from "../UI/ImageInput";
import Modal from "../UI/Modal";
import Grid from "../UI/Grid";
import useProject from "../../Hooks/useProject";
import Card from "../UI/Card";
import { AnimatePresence } from "framer-motion";
import PageTransition from "../UI/PageTransition";

const Profile = () => {
  const { user, data } = useAuth();
  const { userProjects, deleteUserProject } = useProject();

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal((prev) => !prev);

  const [bio, setBio] = useState(data?.bio);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const updateBio = async () => {
    if (!user?.$id) {
      toast.error("User ID is missing.");
      return;
    }

    toast.promise(
      databases.updateDocument("twcdb", "users", user.$id, {
        bio: bio,
      }),
      {
        loading: "Updating Bio...",
        success: "Bio updated successfully!",
        error: "Failed to update bio.",
      }
    );

    toggleModal();
    data.bio = bio;
  };

 
  return (
    <>
      <PageTransition>
        <Layout>
          <div className="main">
            <Heading title="My Profile" subtitle="My humble workspace...😌" />

            <div className="layout">
              {/* Profile Card */}
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 my-8">
                <div className="h-32 w-32 overflow-hidden rounded-full p-2 bg-blue-400 shadow-lg">
                  <img
                    src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${
                      data && data?.name
                    }`}
                    alt="Avatar"
                    className="w-full object-cover rounded-full"
                  />
                </div>
                <div className="flex text-center md:text-left flex-col">
                  <p className="font-semibold font-sora">
                    {user?.name || "No Name yet"}
                  </p>
                  <p className="text-sub text-sm font-medium">
                    {user?.email || "No email"}
                  </p>
                  <span className="text-sm font-semibold rounded-full text-green-500 capitalize">
                    {data?.role || "No role"}
                  </span>
                  <p className="text-sub text-sm font-medium">
                    {data?.gender || "No Gender yet"}
                  </p>
                </div>
              </div>

              {/* Bio */}

              <div className="border bg-light border-line text-sub rounded-lg p-2">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sm font-sora">About Me:</h3>
                  <button
                    onClick={toggleModal}
                    className="btn-primary rounded px-2 py-1"
                  >
                    <Icon styles="text-[1.4em]">edit</Icon>
                    <span>Edit Bio</span>
                  </button>
                </div>
                <p className="text-display bg-secondary rounded p-2 text-sm">
                  {data?.bio || "No bio available."}
                </p>
              </div>
            </div>
            {/* My project */}
            <div className="my-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-base font-sora">
                  My Projects:
                </h3>
                <Link to="/upload" className="btn-primary rounded p-3">
                  <Icon styles="text-[1.4em]">add</Icon>
                  <span>Add Project</span>
                </Link>
              </div>

              {userProjects.length === 0 && (
                <div className="text-center text-sub mt-8">
                  <Icon styles="text-[3em]">hourglass_disabled</Icon>
                  <p className="text-sub text-sm">
                    You don&apos;t have any project yet!
                  </p>
                </div>
              )}
              <Grid>
                {userProjects.map((userProject) => (
                  <Card
                    key={userProject.$id}
                    {...userProject}
                    date={userProject.$createdAt}
                    handleDelete={() => deleteUserProject(userProject.$id, userProject.image)}
                  />
                ))}
              </Grid>
            </div>
          </div>
        </Layout>

        <AnimatePresence>
          {modal && (
            <Modal toggleModal={toggleModal} title="Edit Profile">
              <div className="flex flex-col gap-4">
                <div>
                  <ImageInput handleImageChange={handleImageChange}>
                    <div className="border-dashed bg-secondary border-line border flex-center p-6 rounded-lg">
                      <div className="flex flex-col items-center">
                        <Icon styles="text-sub">add_a_photo</Icon>
                        <div className="font-semibold text-sm text-sub">
                          Profile Image
                        </div>
                        {image?.name && (
                          <div className="font-semibold text-sm bg-lighter px-6 py-2 rounded-full border border-line mt-2">
                            {image?.name}
                          </div>
                        )}
                      </div>
                    </div>
                  </ImageInput>
                  <div className="flex justify-end">
                    <button className="btn-primary mt-2 px-2 h-10 rounded">
                      Update Profile Image
                    </button>
                  </div>
                </div>

                <div>
                  <TextArea
                    label="Edit Bio"
                    id="bio"
                    placeholder="Update bio..."
                    bg_color="bg-secondary"
                    value={bio}
                    handleChange={(e) => setBio(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={updateBio}
                      className="btn-primary mt-2 px-2 h-10 rounded"
                    >
                      Update Bio
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          )}
        </AnimatePresence>
      </PageTransition>
    </>
  );
};

export default Profile;
