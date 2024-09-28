class Api{
callApi(url, method, data){
    return axios({
        url: `https://65d8a742c96fbb24c1bc063d.mockapi.io/api/Food`,
        method: "POST",
        data: food,
    });
}



    fetchData(){
        return axios({
            url: "https://65d8a742c96fbb24c1bc063d.mockapi.io/api/Food",
            method: "GET",
        });
    }

    addFood (){
        return axios({
            url: "https://65d8a742c96fbb24c1bc063d.mockapi.io/api/Food",
            method: "POST",
            data: food,
        });
    }

    deleteFood(){
        return axios({
            url: `https://65d8a742c96fbb24c1bc063d.mockapi.io/api/Food/${id}`,
            method: "DELETE",
        });
    }

    getFoodById(id){
        return axios({
            url: `https://65d8a742c96fbb24c1bc063d.mockapi.io/api/Food/${id}`,
            method: "GET",
        });
    }

    updateFood(){
        return axios({
            url: `https://65d8a742c96fbb24c1bc063d.mockapi.io/api/Food/${id}`,
            method: "PUT",
            data: food,
        })
    }
}
export default Api;