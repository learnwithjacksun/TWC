import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthProvider";
import { databases, storage } from "../Lib/appwriteConfig";
import { ID } from "appwrite";

const useAuth = () => {
  const { login, logout, register, data, user, getUserData } = useContext(AuthContext);

  const uploadProfilePic = async (image) => {
    try {
      if (data?.image) {
        await storage.deleteFile("images", data?.image);
      }

      const newFile = await storage.createFile("images", ID.unique(), image);
      const newFileId = newFile.$id;

      await databases.updateDocument(
        "twcdb", 
        "users", 
        user?.$id, 
        {
          image: newFileId,
        }
      );

      await getUserData(user.$id);

    } catch (error) {
      console.log("Upload Profile Pic Error:", error);
    }
  };

  return { login, logout, register, data, user, uploadProfilePic };
};

export default useAuth;
