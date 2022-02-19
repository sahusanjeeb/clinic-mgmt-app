import supertest from 'supertest';
import app from '../app.js';

describe("Test the get delete patients", () =>{
    jest.setTimeout(10000);
    test("its shoud response the get method", async () => {
        await supertest(app)
        .get("/doctors/delete/620f4a4d3c29e3dad4cf74ff")
        .then(response => {
            console.log(response.text);
            except(response.text.toString().indexOf("patient remove successfully") != -1).toEqual(true);
        })
    })
})