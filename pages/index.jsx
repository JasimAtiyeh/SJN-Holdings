import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

// Main page where all of the house data will be stored
export default function Home() {
  const router = useRouter();
  const userId = localStorage.getItem("userId");
  if (!userId) {
    router.push("/");
  }
  return <div></div>;
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
