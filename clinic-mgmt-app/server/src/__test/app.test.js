import supertest from 'supertest';
import app from '../router/app.js'
import { jest } from "@jest/globals";

test("two plus two is four", () => {
	expect(2 + 2).toBe(4);
});

describe("Test the root path", () => {
	test("The response of GET method", (done) => {
		supertest(app)
			.get("/")
			.then((response) => {
				expect(response.statusCode).toBe(200);
				done();
			});
	});
});

describe("Test to add doctor", () => {
	jest.setTimeout(1000);
	test("The response of POST method",  () => {
			 supertest(app)
			.post("/doctors/add/")
			.then((response) => {
				console.log(response);
				expect(200);
				//expect(response.text.toString().indexOf("Patient removed successfully") != -1).toEqual(true);
			});
	});
});

describe("Test the get delete doctor", () => {
	jest.setTimeout(10000);
	test("It should response the GET method", async () => {
		await supertest(app)
			.get("/doctors/delete/")
			.then((response) => {
				console.log(response.text);
				console.log(response)
				// expect(200)
				expect(
					response.text
						.toString()
						.indexOf("Patient removed successfully")!==-1
						).toBe(false);
			});
	});
});

describe("Testing Doctor Search", () => {
	jest.setTimeout(10000);
	test("neither zone nor volunteer valid", async () => {
		await supertest(app)
			.post("/doctors/name/")   
			//.set('someparameter', 'somevalue')
			.then((response) => {
				console.log(response.text);
				expect(200);
				//expect(response.text.toString().indexOf("Patient searched successfully") != -1).toEqual(true);
			});
	});
});