function deleteFilms(id, authorID){
    console.log(id, authorID);
    axios.delete(`/api/films/${id}`)
    .then(data => {
        console.log(data);
        if(data.status == 200){
            location.replace(`/admin/${authorID}`)
        }else if(data.status = 404){
            window.location('/not-found')
        }
    })
}