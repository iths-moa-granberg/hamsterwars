import React, { useState, createRef } from 'react';
import styles from './Upload.module.scss';
import { getNewId, addHamster } from '../fetchFunctions';
import { Link } from 'react-router-dom';
import Input from './Input';

const Upload = () => {
    const fileInput = createRef();
    const [successfulUpload, setSuccessfulUpload] = useState(null);

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [favFood, setFavFood] = useState('');
    const [loves, setLoves] = useState('');
    const [img, setImg] = useState(false);

    const [nameTouched, setNameTouched] = useState(false);
    const [ageTouched, setAgeTouched] = useState(false);
    const [favFoodTouched, setFavFoodTouched] = useState(false);
    const [lovesTouched, setLovesTouched] = useState(false);
    const [imgTouched, setImgTouched] = useState(false);

    let [nameClass, nameError] = nameTouched ? validateName(name) : ['', ''];
    let [ageClass, ageError] = ageTouched ? validateAge(age) : ['', ''];
    let [favFoodClass, favFoodError] = favFoodTouched ? validateFavFood(favFood) : ['', ''];
    let [lovesClass, lovesError] = lovesTouched ? validateLoves(loves) : ['', ''];

    let formIsValid = nameError === '' && ageError === '' && favFoodError === '' && lovesError === '' && img
        && nameTouched && ageTouched && favFoodTouched && lovesTouched && imgTouched;

    const handleAddHamster = async (e) => {
        e.preventDefault();

        const id = await getNewId();
        const newHamster = {
            id,
            name,
            age: Number(age),
            favFood,
            loves,
            wins: 0,
            defeats: 0,
            games: 0,
            imgName: `hamster-${id}.jpg`,
        }
        if (addHamster(newHamster, img)) {
            setSuccessfulUpload(true);
        } else {
            setSuccessfulUpload(false);
        }
    }

    if (successfulUpload) {
        return (
            <div className={styles.root}>
                <h1>{name} was successfully uploaded!</h1>
            </div>
        );
    }

    if (successfulUpload === false) {
        return (
            <div className={styles.root}>
                <h1>Something went wrong...</h1>
                <Link to="/upload/">Try again?</Link>
            </div>
        );
    }

    return (
        <div className={styles.root}>
            <h1>Upload hamster</h1>
            <p>Please fill in the information and select an image to upload your hamster.</p>
            <form encType="multipart/form-data" className={styles['form-group']}>
                <div className={styles["text-fields-wrapper"]}>
                    <Input
                        label="Name"
                        placeholder="Name of hamster"
                        handleOnChange={setName}
                        handleOnBlur={setNameTouched}
                        className={styles[nameClass]}
                        error={nameError} />
                    <Input
                        label="Age"
                        placeholder="Hamster's age in numbers"
                        handleOnChange={setAge}
                        handleOnBlur={setAgeTouched}
                        className={styles[ageClass]}
                        error={ageError} />
                    <Input
                        label="Favorite food"
                        placeholder="Hamster's favorite food"
                        handleOnChange={setFavFood}
                        handleOnBlur={setFavFoodTouched}
                        className={styles[favFoodClass]}
                        error={favFoodError} />
                    <Input
                        label="Loves"
                        placeholder="Hamster's passion"
                        handleOnChange={setLoves}
                        handleOnBlur={setLovesTouched}
                        className={styles[lovesClass]}
                        error={lovesError} />
                </div>
                <input type="file" ref={fileInput}
                    onChange={() => setImg(fileInput.current.files[0])}
                    onBlur={() => setImgTouched(true)} />
                <button type="submit" disabled={!formIsValid}
                    onClick={e => handleAddHamster(e)}
                >Add hamster</button>
            </form>
        </div>
    );
}

const validateName = name => {
    return name ? ['valid', ''] : ['invalid', "Please enter the hamster's name"];
}

const validateAge = age => {
    return Number(age) ? ['valid', ''] : ['invalid', "Please enter the hamster's age in numbers"];
}

const validateFavFood = favFood => {
    return favFood ? ['valid', ''] : ['invalid', "Please enter the hamster's favorite food"];
}

const validateLoves = loves => {
    return loves ? ['valid', ''] : ['invalid', "Please enter what the hamster loves"];
}

export default Upload;
