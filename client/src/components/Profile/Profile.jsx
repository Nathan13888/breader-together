import React, { useState, useEffect, useContext } from "react";
import { db } from "../../utils/firebaseConfig";
import { collection, getDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { EditOutlined } from "@ant-design/icons";
import { Button, Modal, Input, message } from "antd";
import UserContext from "../../context/userContext";
import NavBar from "../NavBar/NavBar";

function Profile() {
  const { user } = useContext(UserContext);
  const [userFeeds, setUserFeeds] = useState([]);
  const [bio, setBio] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const maxBioChars = 300;

  useEffect(() => {
    async function fetchUserData() {
      const feedCollection = collection(db, "feeds");
      const feedSnapshot = await getDocs(feedCollection);
      const feedData = feedSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const userSpecificFeeds = feedData.filter(feed => feed.userName === user?.displayName);
      setUserFeeds(userSpecificFeeds);

      const userRef = doc(db, "users", user?.uid);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        setBio(userSnapshot.data().bio || "");
      }
    }

    fetchUserData();
  }, [user]);

  const handleEditBio = async () => {
    const userRef = doc(db, "users", user?.uid);
    await updateDoc(userRef, { bio });
    message.success("Bio updated successfully!");
    setIsModalVisible(false);
  };

  return (
    <div className="bg-gradient-to-br from-[#FAF5E9] to-[#FFEFDB] min-h-screen">
      <NavBar />

      <div className="container mx-auto mt-12 mb-12 flex flex-col items-center">
        <div className="relative w-32 h-32 mb-4">
          <img
            className="w-full h-full rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105"
            src={user?.photoURL}
            alt={user?.displayName}
          />
        </div>
        <h1 className="font-semibold text-2xl mb-1">{user?.displayName}</h1>
        <p className="text-gray-600 mb-4 px-4 text-center">{bio}</p>
        <Button
          type="text"
          className="text-[#F53C44] flex items-center border-[#F53C44] rounded-md px-4 py-2 hover:scale-105 transition duration-300"
          onClick={() => setIsModalVisible(true)}
        >
          <EditOutlined />
          <span className="ml-2">edit bio</span>
        </Button>
        <div className="mt-4 text-gray-600">
          Total posts: {userFeeds.length}
        </div>
      </div>

      <main className="px-4 pb-4 grid grid-cols-2 gap-8 max-w-[1000px] mx-auto">
        {userFeeds.map((feed) => (
          <div key={feed.id} className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <p className="mb-4 text-gray-600 text-sm">{feed.description}</p>
            <img
              className="w-full h-[250px] object-cover rounded-md mb-4"
              src={feed.foodImages[0]}
              alt={feed.description}
            />
            <a href={`/feed`}>
              <button
                className="w-full py-2 rounded-md text-[#F53C44] border-2 border-[#F53C44] transition duration-300 hover:bg-[#F53C44] hover:text-white"
              >
                view more
              </button>
            </a>
          </div>
        ))}
      </main>

      <Modal
        title="Edit Bio"
        visible={isModalVisible}
        onOk={handleEditBio}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleEditBio}
            className="bg-[#F53C44] hover:bg-[#F53C44] transition duration-300"
          >
            update bio
          </Button>,
        ]}
      >
        <Input.TextArea
          placeholder="tell us about urself... if u like food, we like u :)"
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="mb-4 shadow-sm rounded-md"
          maxLength={maxBioChars}
        />
        <div className="text-right text-gray-500">
          {bio.length}/{maxBioChars}
        </div>
      </Modal>
    </div>
  );
}

export default Profile;
