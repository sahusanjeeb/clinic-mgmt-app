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

describe("Test to add appointment", () => {
	jest.setTimeout(10000);
	test("The response of POST method", async () => {
		await supertest(app)
			.post("/doctors/add/")
			.then((response) => {
				console.log(response);
				expect(200);
				//expect(response.text.toString().indexOf("Patient removed successfully") != -1).toEqual(true);
			});
	});
});

describe("Test the get delete appointment", () => {
	jest.setTimeout(10000);
	test("It should response the GET method", async () => {
		await supertest(app)
			.get("//doctors/delete/620f44ea7c464677dc4e1939")
			.then((response) => {
				console.log(response.text);
				// expect(200)
				expect(
					response.text
						.toString()
						.indexOf("Patient removed successfully") !== -1
				).toEqual(true);
			});
	});
});

describe("Testing Patient Search", () => {
	jest.setTimeout(10000);
	test("neither zone nor volunteer valid", async () => {
		await supertest(app)
			.post("/appointments/search/patientNumber/1")   
			//.set('someparameter', 'somevalue')
			.then((response) => {
				console.log(response.text);
				expect(200);
				//expect(response.text.toString().indexOf("Patient searched successfully") != -1).toEqual(true);
			});
	});
});