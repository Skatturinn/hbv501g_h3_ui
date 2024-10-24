// import Image from "next/image";
// import styles from "./page.module.css";

import Get from "../Get";
import { Post } from "../Post";
export default function Home() {
  return <>
  <Get/>
  {/* <Post id={"0"} type={'patterns'} method="POST"/> */}
  <Post type="patterns" method="POST"/>
  <Post type="patterns" method="PATCH"/>

  </>;
}
