const { test } = require("malaysia-demographics");
const fs = require("fs");
const superagent = require("superagent");

const readFilePromise = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject("Could not find file.");
            resolve(data);
        });
    });
};

const writeFilePromise = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if (err) reject("Could not write to file.");
            resolve("File written to file,");
        });
    });
};

const getDogPic = async () => {
    try {
        const data = await readFilePromise(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);

        const promise1 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const promise2 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const promise3 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

        const all_response = await Promise.all([promise1, promise2, promise3]);
        const imgs = all_response.map((res) => res.body.message);

        await writeFilePromise("dog-img.txt", imgs.join("\n"));
        console.log("Random dog image saved to file.");
    } catch (err) {
        console.log(err);
        // Error must be thrown else .catch() in the uppper scopes wont catch the error
        throw err;
    }

    return "2: Ready";
};

(async () => {
    try {
        test("hello");
        console.log("1: Getting dog pics");
        const x = await getDogPic();
        console.log(x);
        console.log("3: Done getting dog pics");
    } catch (err) {
        console.log(e);
    }
})();

/*
console.log("1: Getting dog pics");
getDogPic()
    .then((x) => {
        console.log(x);
        console.log("3: Done getting dog pics");
    })
    .catch((e) => {
        console.log(e);
    });
*/
