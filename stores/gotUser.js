export const useGotUser = defineStore("gotUser",() => {
    const otherUser = ref(null);

    if(import.meta.client){
        const storeUser = localStorage.getItem("otherUser");
        if(storeUser){
            otherUser.value = JSON.parse(storeUser);
        }
    }

    function getOtherUser(){
        if(import.meta.client){
            return JSON.parse(localStorage.getItem("otherUser"));
        }
    }
    
    function setOtherUser(user){
        otherUser.value = user;
        if(import.meta.client){
            localStorage.setItem("otherUser", JSON.stringify(user));
        }
    }

    return {otherUser, setOtherUser};
})
