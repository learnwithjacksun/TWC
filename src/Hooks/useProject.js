import { useEffect, useState } from "react";
import { databases, storage } from "../Lib/appwriteConfig";
import useAuth from "./useAuth";
import { ID, Query } from "appwrite";


const useProject = () => {
    const { user, data } = useAuth()
    const [projects, setProjects] = useState(null);
    const [userProjects, setUserProjects] = useState([]);

    const uploadProject = async (title, description, link, tools, image) => {
        try {
            const file = await storage.createFile("images", ID.unique(), image);
            console.log(file);
            const fileid = file.$id;

            await databases.createDocument(
                "twcdb",
                "projects",
                user?.$id, {
                name: data.name,
                role: data.role,
                title,
                description,
                link,
                tools,
                image: fileid,
                userid: user?.$id
            }
            )
        } catch (error) {
            console.log("Upload Project:", error);
        }
    }

    const getProjects = async () => {
        try {
            const res = await databases.listDocuments(
                "twcdb",
                "projects",
            )
            console.log(res);
            setProjects(res.documents.reverse())
        } catch (error) {
            console.log("Get Projects:", error);
        }
    }

    useEffect(() => {
        const fetchUserProjects = async () => {
            try {
                const res = await databases.listDocuments(
                    "twcdb",
                    "projects",
                    [
                        Query.equal('userid', user.$id)
                    ]
                );
                setUserProjects(res.documents);
            } catch (error) {
                console.error("Error fetching user projects:", error);
            }
        };
        getProjects()
        fetchUserProjects();
    }, [user?.$id])

    const deleteUserProject = async () => {
        try {
            await databases.deleteDocument(
                "twcdb",
                "projects",
                userProjects.$id
            )
        } catch (error) {
            console.log("Delete User Project:", error);
        }
    }




    return { uploadProject, projects, userProjects, deleteUserProject }
}

export default useProject