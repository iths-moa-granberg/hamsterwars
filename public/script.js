document.querySelector('button').addEventListener('click', e => {
    e.preventDefault();
    const file = document.querySelector('#file').files[0];

    const formData = new FormData();
    formData.append('photo', file);

    const resp = fetch('/assets/', {
        method: 'POST',
        body: formData,
    })
        .then(resp => resp.json())
        .then(resp => {
            console.log(resp.msg);
        })
        .catch(err => console.error(err));
});