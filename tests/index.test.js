const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

global.fetch = require("jest-fetch-mock");
const app = require("../assets/js/index.js");

describe("app", () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });
    afterEach(() => {
        fetch.resetMocks();
    });

    describe("requests", () => {
        describe("getAllPosts", () => {
            test("it makes a get request", () => {
                app.getAllPosts("https://bloguefp.herokuapp.com/");
                expect(fetch.mock.calls[0][0]).toMatch(/$/);
            });
        });
    });

    describe("submitPost", () => {
        test("it makes a post request with the users submitted data", () => {
            const fakePost = {
                preventDefault: jest.fn(),
                target: {
                    subject: { value: "Test Subject" },
                    journalInput: { value: "Test" },
                    gif: { value: "Test" },
                },
            };

            app.submitPost(fakePost);
            expect(fetch.mock.calls[0][1]).toHaveProperty("method", "POST");
            expect(fetch.mock.calls[0][1]).toHaveProperty("body");
        });
    });
    describe("sendApiRequest", () => {
        test("it makes a call to the API", () => {
            app.sendApiRequest(
                "https://api.giphy.com/v1/gifs/search?api_key=${apikey}&limit=10&q="
            );
            expect(fetch).toHaveBeenCalled();
        });
    });
});
