import { useEffect, useState } from "react"
import useAuth from "./useAuth"
import { databases } from "../Lib/appwriteConfig"
import { ID } from "appwrite"


const useChats = () => {
    const { user } = useAuth()
    const [chats, setChats] = useState([])

    const sendMessage = async (message) => {
        try {
            const res = await databases.createDocument(
                "twcdb",
                "chats",
                ID.unique(),
                {
                    userid: user?.$id,
                    name: user?.name,
                    message:message
                }
            )
            await getMessages()
            console.log(res);
        } catch (error) {
            console.log("Send Message:", error);
        }
    }

    const getMessages = async () => {
        try {
            const res = await databases.listDocuments(
                "twcdb",
                "chats",
            )
            console.log(res);
            setChats(res.documents)
        } catch (error) {
            console.log("Get Messages:", error);
        }
    }

    useEffect(() => {
        getMessages()
    }, [])
    
    const deleteMessage = async (id) => {
        try {
            await databases.deleteDocument(
                "twcdb",
                "chats",
                id
            )
            getMessages()
        } catch (error) {
            console.log("Delete Message:", error);
        }
    }

  return {sendMessage, deleteMessage, chats}
}

export default useChats