const form = document.querySelector("#new-post-form");
form.addEventListener("submit", submitPost);

const gifButton = document.getElementById("gif-button");
gifButton.addEventListener("click", sendApiRequest);
