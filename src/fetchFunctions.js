export const getHamsterById = async (id) => {
    try {
        const response = await fetch(`/api/hamsters/${id}/`);
        const result = await response.json();
        result.imgSrc = await getImage(result);
        return result;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export const getTwoRandomHamsters = async () => {
    try {
        const hamster1 = await getHamsterById('random');
        let hamster2;
        do {
            hamster2 = await getHamsterById('random');
        } while (hamster1.id === hamster2.id);

        return [hamster1, hamster2];
    } catch (err) {
        console.error(err);
        return null;
    }
}

const getImage = async (hamster) => {
    try {
        const response = await fetch(`/api/assets/${hamster.imgName}/`);
        const image = await response.blob();
        return image;
    } catch (err) {
        console.error(err);
    }
}

export const getAgreeance = async ({ winnerId, loserId }) => {
    try {
        const response = await fetch(`/api/stats/agree/?winnerId=${winnerId}&loserId=${loserId}/`);
        const data = await response.json();
        return data.agreeancePercentage;
    } catch (err) {
        console.error(err);
    }
}

export const setGameResult = async (winner, loser) => {
    const headers = { 'Content-Type': 'application/json' };

    try {
        //post game
        fetch('/api/games/', {
            method: 'POST',
            headers,
            body: JSON.stringify({ contestants: [winner, loser], winner }),
        });

        //update winning hamster
        fetch(`/api/hamsters/${winner.id}/result/`, {
            method: 'PUT',
            headers,
            body: JSON.stringify({ wins: 1, defeats: 0 }),
        });

        //update losing hamster
        fetch(`/api/hamsters/${loser.id}/result/`, {
            method: 'PUT',
            headers,
            body: JSON.stringify({ wins: 0, defeats: 1 }),
        });

    } catch (err) {
        console.error(err);
    }
}

export const getNumberOfGames = async () => {
    try {
        const response = await fetch('/api/games/');
        const result = await response.json();
        return Object.keys(result).length;
    } catch (err) {
        console.error(err);
    }
}

export const getTop5 = async () => {
    try {
        const response = await fetch('/api/charts/top/');
        const result = await response.json();

        for (let hamster of result) {
            hamster.imgSrc = await getImage(hamster);
        }

        return result;
    } catch (err) {
        console.error(err);
    }
}

export const getBottom5 = async () => {
    try {
        const response = await fetch('/api/charts/bottom/');
        const result = await response.json();

        for (let hamster of result) {
            hamster.imgSrc = await getImage(hamster);
        }

        return result;
    } catch (err) {
        console.error(err);
    }
}

export const getNewId = async () => {
    try {
        const response = await fetch('/api/hamsters/');
        const result = await response.json();
        return result.length + 1;
    } catch (err) {
        console.error(err);
    }
}

const postImg = async (imgFile, imgName) => {
    try {
        let formData = new FormData();
        formData.append('photo', imgFile, imgName);

        const response = await fetch('/api/assets/', {
            method: 'POST',
            body: formData,
        });
        const result = await response.json();
        return result;
    } catch (err) {
        console.error(err);
        return null;
    }
}

const postHamster = async (hamster) => {
    try {
        const response = await fetch('/api/hamsters/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(hamster),
        });
        const result = await response.json();
        return result;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export const addHamster = (hamster, imgFile) => {
    return postImg(imgFile, hamster.imgName) && postHamster(hamster);
}