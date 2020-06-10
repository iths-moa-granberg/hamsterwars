export const getHamsterById = async (id) => {
    try {
        return await (await fetch(`/api/hamsters/${id}`)).json();
    } catch (err) {
        console.log(err);
    }
}

export const getTwoRandomHamsters = async () => {
    try {
        const hamster1 = await (await fetch(`/api/hamsters/random`)).json();
        let hamster2 = await (await fetch(`/api/hamsters/random`)).json();
        while (hamster1.id === hamster2.id) {
            hamster2 = await (await fetch(`/api/hamsters/random`)).json();
        }
        return [hamster1, hamster2];
    } catch (err) {
        console.log(err);
    }
}

export const getImage = async (hamster) => {
    try {
        const response = await fetch(`/api/assets/${hamster.imgName}`);
        const image = await response.blob();
        return URL.createObjectURL(image);
    } catch (err) {
        console.log(err);
    }
}
