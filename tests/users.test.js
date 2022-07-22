var app = require("../app");
var request = require("supertest");
var mongoose = require("mongoose");

afterAll((done) => {
  // Closing the DB connection
  mongoose.connection.close();
  done();
});

test("sign-in", async () => {
  await request(app)
    .post("/users/sign-in")
    .send({ email: "tdeguill@gmail.com", password: "12345" })
    .expect(200)
    .expect({
      result: true,
      message: "User connected",
      userToken: "-G4h9fGbaxBIU1UQ-4rCMYZRaJXP4dEc",
      firstName: "Tristan",
    });
});

test("delete-crypto", async () => {
  await request(app)
    .post("/cryptos/add-crypto")
    .send({ token: "-G4h9fGbaxBIU1UQ-4rCMYZRaJXP4dEc", id: "bitcoin" })
    .expect(200)
    .expect({ result: true, message: "Correctly added crypto to db" });
  await request(app)
    .delete("/cryptos/delete-crypto/bitcoin/-G4h9fGbaxBIU1UQ-4rCMYZRaJXP4dEc")
    .expect(200)
    .expect({
      result: true,
      message: "Correctly deleted crypto from db",
    });
});

test("stocks", async () => {
  await request(app).get("/stocks/faketoken/7/false").expect(200).expect({
    result: false,
    message: "No user found in db",
  });
});
