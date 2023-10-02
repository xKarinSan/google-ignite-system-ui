import React, { useEffect, useState } from "react";
import { Button, Input, Text, useToast } from "@chakra-ui/react";
import { db, storage } from "../firebaseConfig";
import { ref as databaseRef, onValue, push } from "firebase/database";
import {
    getDownloadURL,
    getStorage,
    ref as storageRef,
    uploadBytes,
} from "firebase/storage";
import { ModifiedInput } from "../General/ModifiedInput";

type Reward = {
    vendorName: string;
    discount: string;
    imagePath: string;
    points: number;
};

type RewardSchema = {
    rewardId: string;
    vendorName: string;
    discount: string;
    imagePath: string;
    points: number;
};

function RewardsPage() {
    // =========== constants ===========
    const toast = useToast({
        duration: 3000,
        isClosable: true,
        position: "top",
    });
    const rewardRef = databaseRef(db, "rewards");
    const rewardImageRef = storageRef(storage);
    // =========== states ===========
    const [rewards, setRewards] = useState<RewardSchema[]>([]); // for all rewards
    const [vendorName, setVendorName] = useState<string>(""); // for adding a reward
    const [discount, setDiscount] = useState<string>(""); // for adding a reward
    const [points, setPoints] = useState<number>(0); // for adding a reward (default 0)
    const [currImage, setCurrImage] = useState<File | null>(null);

    // =========== functions ===========
    // add reward

    // display existing rewards
    const uploadImageToDB = async (file: File) => {
        try {
            // Create a reference to the image in Firebase Storage.
            const imageRef = storageRef(storage, `images/${file.name}`);

            // Upload the image to Firebase Storage.
            await uploadBytes(imageRef, file);

            // Get the download URL for the image.
            const downloadURL = await getDownloadURL(imageRef);
            // Return the download URL.
            return downloadURL;
        } catch (e) {
            console.log(e);
            toast({ title: "Failed to upload image", status: "error" });
            return "";
        }
    };

    // add reward (onSubmit)
    const addReward = async () => {
        try {
            // validation of fields
            if (!vendorName || !discount || points == 0) {
                toast({
                    title: "Please fill in all fields",
                    status: "error",
                });
                return;
            }
            // add image into storage
            // get the image cloud URL
            // add record
            let imagePath = "";
            if (currImage != null) {
                imagePath = await uploadImageToDB(currImage);
            }
            await push(rewardRef, {
                vendorName,
                discount,
                points,
                imagePath,
            });
            setDiscount("");
            setPoints(0);
            setVendorName("");
            setCurrImage(null);
            toast({
                title: "Reward added!",
                status: "success",
            });
        } catch (e) {
            console.log(e);
            toast({
                title: "Failed to add reward",
                status: "error",
            });
        }
    };
    return (
        <div>
            Rewards
            <ModifiedInput
                type="text"
                placeholder="Vendor Name"
                value={vendorName}
                onChange={setVendorName}
            />
            <ModifiedInput
                type="text"
                placeholder="Discount"
                value={discount}
                onChange={setDiscount}
            />
            <ModifiedInput
                type="number"
                placeholder="Points:"
                value={points}
                onChange={setPoints}
            />
            <input
                type="file"
                placeholder="Add an Image"
                accept="image/*"
                // value={image}
                onChange={(e) => {
                    if (e.target.files) {
                        setCurrImage(e.target.files[0]);
                        console.log(e.target.files[0]);
                    }
                }}
            />
            <Button
                onClick={() => {
                    addReward();
                }}
            >
                Add Reward
            </Button>
        </div>
    );
}

export default RewardsPage;
