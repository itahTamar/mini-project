export const getDogBreed = async (dogProp: string) => {
    try {
        const response = await fetch(`https://dog.ceo/api/breed/${dogProp}/images/random`);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};