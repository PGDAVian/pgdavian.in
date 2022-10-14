const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

describe("index.html", () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    describe("head", () => {
        test("it has a title", () => {
            const head = document.querySelector("head");
            expect(head).toBeTruthy();
            expect(head.textContent).toContain("Blogue");
        });
        test("there is a css stylesheet", () => {
            const head = document.querySelector("head");
            expect(head.innerHTML).toContain('link rel="stylesheet"');
        });
        test("there is a media query stylesheet", () => {
            const head = document.querySelector("head");
            expect(head.innerHTML).toContain('href="assets/css/media-queries.css"');
        });
        test("there is a favicon", () => {
            const head = document.querySelector("head");
            expect(head.innerHTML).toContain('link rel="icon"');
        });

        describe("body", () => {
            test("there is a header and it has a title", () => {
                const header = document.querySelector("header");
                expect(document.querySelector("header")).toBeTruthy();
                expect(header.textContent).toContain("BLOGUE");
            });
            test("it has a button for scrolling to the make a post section", () => {
                let postButton = document.querySelector(".navigate");
                expect(postButton).toBeTruthy();
                expect(postButton.textContent).toContain("Make a Post");
            });   

            describe("form", () => {
                test("subject has max character length of 100", () => {
                    let form = document.querySelector("#new-post-form");
                    expect(form.innerHTML).toContain("100");
                });
                test("journal input has max character length of 1000", () => {
                    let form = document.querySelector("#new-post-form");
                    expect(form.innerHTML).toContain("1000");
                });
                test("it has a button for submitting a post", () => {
                    let submitButton = document.querySelector(".submit");
                    expect(submitButton).toBeTruthy();
                    expect(submitButton.textContent).toContain("SUBMIT");
                });
                test("it has a button for adding a gif", () => {
                    let gifButton = document.querySelector("#gif-button");
                    expect(gifButton).toBeTruthy();
                    expect(gifButton.textContent).toContain("Add GIF");
                });
               
    
            });
        });
    });
});
