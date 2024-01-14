import { useEffect, useState } from "react"
import { getDogBreed } from "../api/dogsApi"
import DogCard from "./DogCard";
import { useNavigate } from 'react-router-dom';
import '../style/dogsPage.css'
import Debouncing from "./Debouncing";

export const dogBreeds: string[] = [
    "affenpinscher",
    "dachshund",
    "redbone",
    "shiba",
    "stbernard"
];

export interface Dog {
    message: string,
    status: string,
    breed: string,
}

export const dogArr: Dog[] = []

const DogsPage = () => {
    const [dogs, setDogs] = useState<Dog[]>([])
    const [filterDogs, setFilterDogs] = useState<Dog[]>([])
    const navigate = useNavigate()

    const handleGetAllDogs = async () => {
        try {
            for (let i = 0; i < dogBreeds.length - 1; i++) {
                dogArr[i] = await getDogBreed(dogBreeds[i])
                dogArr[i].breed = dogBreeds[i]
            }
            setDogs(dogArr)
            setFilterDogs(dogArr)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        handleGetAllDogs()
    }, [])

    return (
        <>
        <Debouncing setFilterDogs={setFilterDogs} dogs={dogs} />
        <div className="dog-container">
            {dogs && dogs.length > 0 ?
                (filterDogs.map((dog) => {
                    return (
                        <div key={dog.breed} className="cardWrapper">
                            <DogCard dog={dog} />
                            <button onClick={() => { navigate(`/dog/${dog.breed}`) }}>More Info</button>
                        </div>
                    )
                })) : (
                    <p>no dog</p>
                )}

        </div>
        </>
    )
}

export default DogsPage
