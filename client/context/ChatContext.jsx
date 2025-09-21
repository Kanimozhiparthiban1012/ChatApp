import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from '../context/AuthContext.jsx';
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unseenMessages, setUnseenMessages] = useState({});

    const { socket, axios, onlineUsers } = useContext(AuthContext);


    const getUsers = async () => {
        try {
            const token = localStorage.getItem("token")
            if (!token) return
            const { data } = await axios.get("/api/messages/users");
            console.log(data.users)

            if (data.success) {
                setUsers(data.users);
                setUnseenMessages(data.unseenMessages);
                console.log("Fetched users:", data.users);
            }
        } catch (error) {
            console.log("Error fetching users:", error?.response?.data || error.message);
            toast.error(error.response?.data?.message || error.message);
        }
    };


    const getMessages = async (userId) => {
        try {
            const { data } = await axios.get(`/api/messages/${userId}`);
            if (data.success) {
                setMessages(data.messages);
            }
        } catch (error) {
            console.error("GetMessages Error:", error.message);
        }
    };

    const sendMessage = async (messageData) => {
        try {
            const { data } = await axios.post(
                `/api/messages/send/${selectedUser._id}`,
                messageData
            );
            if (data.success) {
                setMessages((prevMessages) => [...prevMessages, data.newMessage]);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const subscribeToMessages = async () => {
        if (!socket) return;

        socket.on("newMessage", (newMessage) => {
            if (selectedUser && newMessage.senderId === selectedUser._id) {
                newMessage.seen = true;
                setMessages((prevMessages) => [...prevMessages, newMessage]);
                axios.put(`/api/messages/mark/${newMessage._id}`);
            } else {
                setUnseenMessages((prevUnseenMessages) => ({
                    ...prevUnseenMessages,
                    [newMessage.senderId]: prevUnseenMessages[newMessage.senderId]
                        ? prevUnseenMessages[newMessage.senderId] + 1
                        : 1,
                }));
            }
        });
    };

    const unsubscribeFromMessages = () => {
        if (socket) socket.off("newMessage");
    };

    useEffect(() => {
        subscribeToMessages();
        return () => unsubscribeFromMessages();
    }, [socket, selectedUser]);

    useEffect(() => {
        getUsers(); // ✅ fix this
    }, [onlineUsers]); // not using onlineUsers

    const value = {
        messages,
        users,
        selectedUser,
        getUsers,
        getMessages,
        sendMessage,
        setSelectedUser,
        unseenMessages,
        setUnseenMessages,
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
};