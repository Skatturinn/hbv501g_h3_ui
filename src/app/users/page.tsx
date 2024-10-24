// import Image from "next/image";
// import styles from "./page.module.css";

import Get from "../Get";
import { Post } from "../Post";

export default function Home() {
  return <>
  <Get/>
  <Post type="users" method="POST"/>
  <Post type="users" method="PATCH"/>
  </>;
}
