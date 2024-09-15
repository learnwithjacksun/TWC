import { useEffect, useState } from "react";
import { databases, storage } from "../Lib/appwriteConfig";
import useAuth from "./useAuth";
import { ID, Query } from "appwrite";
import { useNavigate } from "react-router-dom";


const useProject = () => {
    const { user, data } = useAuth()
    const [projects, setProjects] = useState([]);
    const [userProjects, setUserProjects] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);
    const navigate = useNavigate()

    const uploadProject = async (title, description, link, tools, image) => {
        try {
            const file = await storage.createFile("images", ID.unique(), image);
            console.log(file);
            const fileid = file.$id;

            await databases.createDocument(
                "twcdb",
                "projects",
                ID.unique(), {
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
            navigate("/projects")
        } catch (error) {
            console.log("Upload Project:", error);
        }
    }

    const getProjects = async () => {
        try {
            const usersRes = await databases.listDocuments("twcdb", "users");

            const projectsRes = await databases.listDocuments("twcdb", "projects");

            setProjects(projectsRes.documents.reverse());

            const userProjectCount = usersRes.documents.reduce((acc, user) => {
                acc[user.$id] = { count: 0, name: user.name, role: user.role };
                return acc;
            }, {});

            projectsRes.documents.forEach((project) => {
                const userid = project.userid;
                if (userProjectCount[userid]) {
                    userProjectCount[userid].count += 1;
                }
            });

            const sortedLeaderboard = Object.entries(userProjectCount)
                .map(([userid, { count, name, role }]) => ({ userid, count, name, role }))
                .sort((a, b) => b.count - a.count);

            setLeaderboard(sortedLeaderboard);
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
    }, [user?.$id, projects])

    const deleteUserProject = async (projectid, imageid) => {
        try {
            await databases.deleteDocument("twcdb", "projects", projectid);
            await storage.deleteFile("images", imageid)
            getProjects()
        } catch (error) {
            console.log("Delete User Project:", error);
        }
    };





    return { uploadProject, projects, userProjects, deleteUserProject, leaderboard }
}

export default useProject