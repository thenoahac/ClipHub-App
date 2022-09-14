import SplashPage from "../pages/Splash";
import SignUp from "../pages/SignUp";
import LogIn from "../pages/LogIn";
import AddImage from "../pages/AddImage";
import SeeImage from "../pages/SeeImage";


const PageManager = ({loc, user, userId, changePage, changeUser}) => {
    switch (loc){
        case "signUp":
            if (user){
               changePage("imageAdd");
               return; 
            }

            return (
                <SignUp
                    changePage={changePage}
                    changeUser={changeUser}
                 />
            )
        case "logIn":
            if (user){
                changePage("imageAdd");
                return; 
            }

            return (
                <LogIn
                    changePage={changePage}
                    changeUser={changeUser}
                />
            )
        case "imageAdd":
            if (!user){
                changePage("logIn");
                return;
            }

            return (
                <AddImage 
                    changePage={changePage}
                    user={user}
                    userId={userId}
                />
            )
        case "imageShow":
            if (!user){
                changePage("logIn");
                return;
            }

            return (
                <SeeImage 
                    changePage={changePage}
                    user={user}
                    userId={userId}
                />
            )
        default:
            return (
                <SplashPage
                    changePage={changePage}
                 />
            )
    }
}

export default PageManager;