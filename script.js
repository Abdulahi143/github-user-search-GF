// Declare variables and ids
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const userInfoContainer = document.getElementById('user-info');


// fetching the data from githubs api 
async function fetchUserInfo(username) {
    try {         
        const response = await fetch(`https://api.github.com/users/${username}`); //template literal
        const userInfo = await response.json();    
        return userInfo;
    } catch (error) {
        console.log(error.message);
    }
}

// displaying the user info on the container
function displayUserInfo(userInfo) {
    if (!userInfo) {
        userInfoContainer.innerHTML = "<p>No user found</p>";        
        return;
    }else if (userInfo.name === undefined) {
        userInfoContainer.innerHTML = "<p>No user found</p>";  
        return; 
    }

const display = `
    <img id="user-avatar" src="${userInfo.avatar_url}" alt="">
    <h2>${userInfo.name}</h2>
    <p>Username: ${userInfo.login} </p>
    <p>Date of Joining: ${new Date(userInfo.created_at).toLocaleDateString()} </p>
    <p>Following: ${userInfo.following} </p>
    <p>Followers: ${userInfo.followers}</p>
    <p>Last updated: ${new Date(userInfo.updated_at).toLocaleDateString()}</p>
    <p>Repos: ${userInfo.public_repos}</p>
`;
    userInfoContainer.innerHTML = display; //not -->    displayUserInfo();  
   
}

async function handleSearch() {
    const username = searchInput.value.trim();

    if (username === "") {
        userInfoContainer.innerHTML = "<p>Please enter a username</p>";
        return;
    }
    const userInfo = await fetchUserInfo(username);
    displayUserInfo(userInfo);    
}

//add click event listener to the search button
searchButton.addEventListener('click', handleSearch);

//add key press event listener to the search input
searchInput.addEventListener('keyup', function(event) {
    // if(event.key === 'Enter') {
    //     handleSearch();
    // }
    handleSearch();
});





