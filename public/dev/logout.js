if(document.querySelector("#logout-button")){


    document.querySelector("#logout-button").addEventListener("click", e => {
        e.preventDefault();
        //GMSretrieve back destroy route
        fetch("/api/users/logout",
            {
                //GMS logout is, in fact, a post...
                method: "POST",
            }).then(res => {
                console.log("clicked");
                if (res.ok) {
                    //GMS redirect to login upon successful post 
                    location.href = "/login"
                } else {
                    alert("Unsuccesful response.")
                }
            });
    })
    }