import DogCard from "./DogCard";
import ChatBox from './ChatBox';
import '../style/chatBox.css';
import 'stream-chat-react/dist/css/v2/index.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Dog } from './DogsPage';
import { getDogBreed } from './../api/dogsApi';
import { useEffect, useState } from "react";

const DogPge = () => {
    const [dataDog, setDataDog] = useState<Dog>();
    let { breed } = useParams();
    const navigate = useNavigate()

    useEffect(() => {

        const specificDog = async () => {
            if (breed == undefined) throw new Error("the breed in DogPge is undefined!");
            console.log(breed)
            try {
                const data: Dog = await getDogBreed(breed);
                if (!data) throw new Error("no dog data");
                data.breed = breed;
                console.log("at specificDog the data:", data);
                setDataDog(data);
            } catch (error) {
                console.error("Error fetching specific dog:", error);
            }
        };

        specificDog();
    }, [breed]);

    return (
        <div>
            <DogCard key={breed} dog={dataDog} />
            <ChatBox />
            <button onClick={() => { navigate(`/`) }}>Back</button>
        </div>
    );
};

export default DogPge;

