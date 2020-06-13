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
export const getAgreeance = async (winnerId, loserId) => {
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
