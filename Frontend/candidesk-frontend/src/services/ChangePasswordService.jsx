import axios from "axios";

export const changePassword = (oldPassword, newPassword) => {
    return axios.post("http://localhost:8080/api/profile/change-password", {
        oldPassword,
        newPassword
    });
};
