import { FC } from "react";
import '../style/dogCard.css';

interface DogCardProps {
    dog: Dog | undefined;
}

export interface Dog {
    message: string,
    status: string,
    breed: string,
}

const DogCard: FC<DogCardProps> = ({ dog }) => {

    return (
        <>
            {dog != undefined ?
                <div className="dog-card">
                    <img className="dog-img" src={dog.message} alt={dog.breed} />
                    <div className="dog-info">
                        <h3>{dog.breed}</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum, in dicta ipsum fuga sint, eos excepturi nostrum velit dolorem non dolore illum delectus. Repellat, minus nihil. Sit vitae suscipit quia.</p>
                    </div>
                </div>
                :
                <p>dog undefine</p>
            }
        </>
    )
}

export default DogCard;
