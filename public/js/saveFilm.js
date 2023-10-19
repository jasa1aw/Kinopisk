function saveToWatch(id){
    console.log(id);
    axios.post('/api/films/save', {id}).then(data => {
        if(data.status == 200){
            alert(data.data)
        }
    })
}