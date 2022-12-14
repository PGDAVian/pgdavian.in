(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// ******************** Submitting a new form ********************
// const form = document.querySelector("#new-post-form");
// form.addEventListener("submit", submitPost);

function submitPost(e) {
    e.preventDefault();
    const currentDate = new Date();
    const dateTimeStamp = `${currentDate.getDate()}/${
        currentDate.getMonth() + 1 // because january starts at 0
    }/${currentDate.getFullYear()}, ${currentDate.getHours()}:${currentDate.getMinutes()}`;

    console.log(document.getElementById("gifPreview").getAttribute("src"));
    const postData = {
        subject: e.target.subject.value,
        journalInput: e.target.journalInput.value,
        gif: document.getElementById("gifPreview").getAttribute("src"),
        date: dateTimeStamp,
    };

    const options = {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
            "Content-Type": "application/json",
        },
    };

    fetch("20.219.167.154:3000/", options) // also do we need to put this in a function to export?
        .then((resp) => resp.json())
        .then(appendPost)
        .catch(console.warn);
}

// ******************** Append all new post to the page ********************
function appendPosts(posts) {
    posts.forEach((post) => appendPost(post));
}

// ******************** Function to append together a single post from submitted data ********************
let parent = document.getElementById("postsContainer");
function appendPost(data) {
    const postsDiv = document.createElement("div");
    postsDiv.setAttribute("class", "newPostDiv");

    // headers for the subject names
    const header = document.createElement("h4");
    header.setAttribute("id", "commentHeading");
    header.textContent = `Post ${data.id}: ` + data.subject;

    // paragraphs for the journal content
    const contents = document.createElement("p");
    contents.setAttribute("id", "commentContents");
    contents.textContent = data.journalInput;

    // paragraphs for the date
    const date = document.createElement("p");
    date.textContent = data.date;

    // imgs for the gif
    console.log(data.gif);
    const newImg = document.createElement("img");
    newImg.src = data.gif;
    newImg.style.display = "block";
    newImg.style.margin = "0 auto";

    // div for emoji icons and assigning icons a class of emoji
    const reactionDiv = document.createElement("div");
    const loveIcon = `<i class="fas fa-heart fa-2x emoji"><small id="heartCounter${data.id}">${data.reactions.heart}</small></i>`;
    const cryIcon = `<i class="fas fa-sad-tear fa-2x emoji"><small id="cryCounter${data.id}">${data.reactions.cry}</small></i>`;
    const laughIcon = `<i class="fas fa-laugh-squint fa-2x emoji"><small id="laughCounter${data.id}">${data.reactions.laugh}</small></i>`;
    reactionDiv.setAttribute("class", `${data.id}`);
    reactionDiv.innerHTML = loveIcon + cryIcon + laughIcon;

    // create form for comments
    const commentDiv = document.createElement("div");
    const formComment = document.createElement("form");
    // create text input to type comment
    const formCommentInput = document.createElement("input");
    formCommentInput.setAttribute("type", "text");
    formCommentInput.setAttribute("name", "comments");
    formCommentInput.setAttribute("placeholder", "Add a comment");
    formCommentInput.setAttribute("class", "formCommentInput");
    // set id to the post to use later
    formComment.setAttribute("id", data.id);
    // create submit button
    const formCommentSubmitButton = document.createElement("input");
    formCommentSubmitButton.setAttribute("type", "submit");
    formCommentSubmitButton.setAttribute("class", "formCommentSubmitButton");
    // append form together
    formComment.append(formCommentInput);
    formComment.append(formCommentSubmitButton);
    // add event listener to comment submit button
    formComment.addEventListener("submit", submitComment); // function below
    commentDiv.appendChild(formComment);

    // appending each element to the new postsDiv, and then append this new div to existing postsContainer
    postsDiv.appendChild(header);
    postsDiv.appendChild(contents);
    postsDiv.appendChild(newImg);
    postsDiv.appendChild(date);
    postsDiv.appendChild(reactionDiv);
    postsDiv.appendChild(commentDiv);
    parent.append(postsDiv);
    const emojis = reactionDiv.getElementsByClassName("emoji");
    for (let emoji of emojis) {
        emoji.addEventListener("click", emojiReact);
    }
}

// ******************** Function for users to submit comments to posts ********************
function submitComment(e) {
    e.preventDefault();
    const postId = parseInt(e.target.getAttribute("id"));
    const commentData = {
        comment: e.target.comments.value,
    };

    const options = {
        method: "PATCH",
        body: JSON.stringify(commentData),
        headers: {
            "Content-Type": "application/json",
        },
    };

    fetch(`20.219.167.154:3000/${postId}`, options)
        .then((r) => r.json())
        .catch(console.warn);

    commentsFunction(commentData, e.target);
    e.target.comments.value = "";
}

// ******************** Create function for new replies ********************

function commentsFunction(commentData, formComment) {
    const newCommentContainer = document.createElement("div");
    const newCommentMessage = document.createElement("p");
    newCommentMessage.setAttribute("class", "newCommentMessage");
    newCommentMessage.textContent = `${commentData.comment}`;
    newCommentContainer.append(newCommentMessage);
    formComment.append(newCommentContainer);
}

// ******************** Function to handle emoji ********************
function emojiReact(e) {
    console.log(e);
    let emoji = e.path[0].classList;
    if (emoji[1] === "fa-heart") {
        emoji = "heart";
    } else if (emoji[1] === "fa-sad-tear") {
        emoji = "cry";
    } else {
        emoji = "laugh";
    }
    const postId = e.path[1].className;
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
    };
    fetch(`20.219.167.154:3000/${postId}/${emoji}`, options)
        .then((resp) => resp.json())
        .then((data) => emojiCounter(data, postId, emoji))
        .catch(console.warn);
}

function emojiCounter(data, postId, emoji) {
    document.getElementById(`${emoji}Counter${postId}`).textContent =
        data.count;
}

// ******************** Add a GIF ********************
// const gifButton = document.getElementById("gif-button");
// gifButton.addEventListener("click", sendApiRequest);

function sendApiRequest(e) {
    // e.preventDefault(); Button has no default behaviour
    let apikey = "DV4iN2mItn9xsI2WSKzWWKpTaNpw9H9n";
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&limit=10&q=`;
    let str = document.getElementById("giphy").value.trim();
    url = url.concat(str);
    console.log(url);

    fetch(url)
        .then((r) => r.json())
        .then((content) => {
            let gifimg = document.getElementById("gifPreview");
            gifimg.setAttribute(
                "src",
                content.data[Math.floor(content.data.length * Math.random())]
                    .images.downsized.url
            ); // choose a random gif out of the limit of 10
            gifimg.classList.add("imgFormat");
            //let gifContainer = document.getElementById("gifContainer");
            //gifContainer.append(gifimg);
            //gifContainer.insertAdjacentElement("afterbegin", gifimg); // gif image will show up as a preview in the make a post section
        })
        .catch((err) => {
            console.log(err);
        });
}

// ******************** Get all posts as soon as app is loaded ********************
function getAllPosts() {
    fetch("20.219.167.154:3000/")
        .then((r) => r.json())
        .then(appendPosts)
        .catch(console.warn);
}

getAllPosts();

// ********************  Function exporting for testing ********************

module.exports = {
    submitPost,
    appendPost,
    appendPosts,
    sendApiRequest,
    submitComment,
    commentsFunction,
    emojiReact,
    getAllPosts,
};

},{}]},{},[1]);
