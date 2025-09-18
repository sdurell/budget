const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

export const authenticateLogin = async (username, password) => {
    // const response = await fetch(``);
    // const data = await response.json();
    // return data.results;
    await sleep(1500);

    if(username === "Spencer" && password === "Durell"){
        return "Spencer";
    }
    else{
        throw new Error("Wrong username/password");
    }
}