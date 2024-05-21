import { Chance } from "chance";
import express from "express";

const app = express()

interface User {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  password: string
  birthdate: Date
  address: {
    city: string
    state: string
    country: string
  };
}

const createUser = () => {
  const chance = new Chance();
  const user: User = {
    firstName: chance.first(),
    lastName: chance.last(),
    email: chance.email(),
    phoneNumber: chance.phone({ formatted: false }),
    password: chance.string({
      symbols: true,
      length: 16,
      alpha: true,
      numeric: true,
    }),
    birthdate: chance.birthday({ american: false }) as Date,
    address: {
      city: chance.city(),
      state: chance.state({ full: true }),
      country: chance.country({ full: true }),
    },
  };

  return user
}

app.get("/", (_, res) => {
    res.json(createUser())
})

app.listen(5001, () => {
    console.log("Server started")
})
