import React, { useState, useEffect, useContext } from "react";
import { db } from "../../utils/firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  increment,
} from "firebase/firestore";
import { HeartOutlined, PlusOutlined } from "@ant-design/icons";
import { Carousel, Button, Modal, Input } from "antd";

import UserContext from "../../context/userContext";
import NavBar from "../NavBar/NavBar";

function Feed() {
  const [feeds, setFeeds] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newDescription, setNewDescription] = useState("");
  const [newImages, setNewImages] = useState([]);
  const { user } = useContext(UserContext);

  async function fetchFeeds() {
    const feedCollection = collection(db, "feeds");
    const feedSnapshot = await getDocs(feedCollection);
    const feedData = feedSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFeeds(feedData);
  }

  useEffect(() => {
    fetchFeeds();
  }, []);

  const handleAddFeed = async () => {
    const newFeed = {
      description: newDescription,
      foodImages: newImages,
      userName: user?.displayName,
      userProfile: user?.photoURL,
    };

    await addDoc(collection(db, "feeds"), newFeed);
    setIsModalVisible(false);
    setNewDescription("");
    setNewImages([]);
    fetchFeeds(); // Refresh feed
  };

  const handleLoveClick = async (feedId, lovedBy = []) => {
    // If the user has already loved this feed, do nothing
    if (lovedBy.includes(user?.uid)) return;

    const feedRef = doc(db, "feeds", feedId);

    // Increment the loves count and add user ID to the lovedBy array
    await updateDoc(feedRef, {
      loves: increment(1),
      lovedBy: [...lovedBy, user?.uid],
    });

    // Refresh feed
    fetchFeeds();
  };

  return (
    <div className="bg-gradient-to-br from-[#FAF5E9] to-[#FFEFDB] min-h-screen">
      <NavBar />

      <div className="container mx-auto mt-4 mb-8">
        <Button
          type="text"
          className="text-[#F53C44] flex items-center border-[#F53C44] rounded-md px-4 py-2 hover:scale-120 transition duration-300"
          onClick={() => setIsModalVisible(true)}
        >
          <PlusOutlined />
          <span className="ml-2">add new post</span>
        </Button>
      </div>

      <main className="px-4 pb-4 grid grid-cols-2 gap-8 max-w-[1000px] mx-auto">
        {feeds.map((feed) => (
          <div key={feed.id} className="p-4 bg-white rounded-xl shadow-md">
            <div className="flex items-center mb-4 space-x-4">
              <img
                className="w-12 h-12 rounded-full"
                src={feed.userProfile}
                alt={feed.userName}
              />
              <span className="font-semibold text-lg">{feed.userName}</span>
            </div>
            <p className="mb-4 text-gray-600 text-sm">{feed.description}</p>
            <Carousel className="mb-4 rounded-md overflow-hidden"
              autoplay
              autoplaySpeed={3000}
              pauseOnHover
              pauseOnFocus
              pauseOnDotsHover
              infinite
              dots
              dotPosition="top"
            >

              {feed.foodImages.map((image, index) => (
                <div key={index}>
                  <img
                    className="w-full h-[250px] object-cover"
                    src={image}
                    alt={`food-${index}`}
                  />
                </div>
              ))}
            </Carousel>
            <button
              className={`w-full py-2 rounded-md ${
                feed.lovedBy?.includes(user?.uid)
                  ? "cursor-not-allowed bg-[#F53C44] text-white opacity-80"
                  : "hover:bg-[#F53C44] hover:text-white text-[#F53C44]"
              } border-2 border-[#F53C44] transition duration-300`}
              onClick={() => handleLoveClick(feed.id, feed.lovedBy)}
              disabled={feed.lovedBy?.includes(user?.uid)}
            >
              <span className="flex items-center justify-center">
                <HeartOutlined />
                <span className="ml-2">{feed.loves || 0} {feed.loves === 1 ? "loaf" : "loaves"}</span>
              </span>
            </button>
          </div>
        ))}
      </main>

      <Modal
        title="Create New Feed"
        visible={isModalVisible}
        onOk={handleAddFeed}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleAddFeed}
            disabled={!newDescription || !newImages.length}
            className="bg-[#F53C44] hover:bg-[#F53C44] transition duration-300"
          >
            post my food
          </Button>,
        ]}
      >
        <Input.TextArea
          placeholder="tell us about ur food..."
          rows={4}
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          className="mb-4 shadow-sm rounded-md"
        />
        <Input
          placeholder="imgs (separated by commas)"
          onChange={(e) => setNewImages(e.target.value.split(","))}
          className="shadow-sm rounded-md"
        />
      </Modal>
    </div>
  );
}

export default Feed;
