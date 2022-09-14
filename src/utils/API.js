const API_LOCATION = "https://cliphub-back.herokuapp.com/";

const API = {
    checkName: async (nameToCheck) => {
        let checkResponse = await fetch(`${API_LOCATION}/api/users/check/${nameToCheck}`)
                                .then(resp => resp.json())
                                .then(resp => {
                                    console.log(resp);
                                    return resp;
                                })
        return checkResponse.thisCanBeUsed;
    },
    addUser: async (userToAdd) => {
        let checkResponse = await fetch(`${API_LOCATION}/api/users/`,
        {
            method: "POST",
            body: JSON.stringify(userToAdd),
            headers: { "Content-Type": "application/json"},
            withCredentials: 'include'
        }).then(resp => resp.json())
        .then(resp => {
                    console.log(resp);
                    return resp;
                })
        return checkResponse;
    },
    logIn: async (userToLogIn) => {
        let checkResponse = await fetch(`${API_LOCATION}/api/users/login`,
        {
            method: "POST",
            body: JSON.stringify(userToLogIn),
            headers: { "Content-Type": "application/json"},
            withCredentials: 'include'
        }).then(resp => resp.json())
        .then(resp => {
                    return resp;
                })
        return checkResponse;
    },
    logOut: async () => {
        let checkResponse = await fetch(`${API_LOCATION}/api/users/logout`,
        {
            method: "POST",
            body: JSON.stringify({}),
            headers: { "Content-Type": "application/json"},
            withCredentials: 'include'
        }).then(resp => {
            return resp;
        })
        .then(resp => {
                    return resp;
                })
        return checkResponse;
    },
    getAllImages: async() => {
        let checkResponse = await fetch(`${API_LOCATION}/api/images`)
                                .then(resp => resp.json())
                                .then(resp => {
                                    console.log(resp);
                                    return resp;
                                })
        return checkResponse;
    },
    getUserImages: async(userId) => {
        if (userId){
            let checkResponse = await fetch(`${API_LOCATION}/api/images/${userId}`)
                    .then(resp => resp.json())
                    .then(resp => {
                        console.log(resp);
                        return resp;
                    })
            return checkResponse;
        }
    }
}

export default API;