import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@/config/firebase/firebaseAuthentication";
export const handleLogin = async (userEmail: string, userPassword: string, userData: any) => {
    try {
        await signInWithEmailAndPassword(userEmail, userPassword);
        console.log(userData);
        alert("Successfully logged in!");
        redirectToPage(userData);
    } catch (error) {
        console.error("Error signing in:", error);
    }
};


const redirectToPage = (userData: any) => {
    if (!userData) {
        console.error("User data not available.");
        return;
    }


    switch (userData.userAccountStatus) {
        case "Pending":
            window.location.href = "/authentication/account/pending";
            break;
        case "Declined":
            window.location.href = "/authentication/account/declined-account";
            break;
        case "Approved":
            switch (userData.userAccountType) {
                case "Admin":
                    window.location.href = "/dashboard";
                    break;
                case "Regular":
                    window.location.href = "/authentication/thankyou";
                    break;
                default:
                    console.error("Unknown account type:", userData.userAccountType);
            }
            break;
        default:
            console.error("Unknown account status:", userData.userAccountStatus);
    }
};

export const handleSignUp = async (userEmail: string, userPassword: string, userFirstName: string, userLastName: string, userDepartment: string, setError: (error: string) => void) => {
    console.log(userEmail, userPassword, userDepartment, userFirstName, userLastName);

    const userDisplayName = `${userFirstName} ${userLastName}`

    try {
        await createUserWithEmailAndPassword(
            userEmail,
            userPassword,
            userDisplayName, 
            userDepartment,
        )
        alert("User registered successfully.");
        window.location.href = "/";
    } catch (error) {
        setError((error as Error).message);
    }
}
