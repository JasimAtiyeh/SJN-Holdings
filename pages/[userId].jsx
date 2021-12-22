// import { useRouter } from "next/router";
// import { useEffect } from "react";

import { useState } from "react";

// Main page where all of the house data will be stored
export default function UserHomePage({ userId }) {
  // const router = useRouter();
  const [loading, setLoading] = useState(true);

  fetch("/api/users").then((response) => {
    if (response.ok) {
      response.json().then((mongoUsers) => {
        const isValidUser = mongoUsers.some((user) => user.id === userId);
        console.log(isValidUser);

        if (!isValidUser) {
          // router.replace("/");
          return <p>User not found</p>;
        }

        setLoading(false);
      });
    }
  });

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return <div>Hello World</div>;
  }
}

// SCHEMA

// houses
// {
//   _id: ObjectId
//   leasePayment: number,
//   leaseStart: string,
//   leaseEnd: string,
//   bed: number,
//   bath: number,
//   squareFeet: number,
//   address: string,
//   zestimate: number,
//   purchasePrice: number,
//   paymentOnHouse: number,
//   taxPrice: number,
//   insurancePrice: number,
//   yearBuilt: number,
//   owner: string[]
//   }

// users
// {
//   _id: ObjectId,
//   username: string,
//   password: string
// }
