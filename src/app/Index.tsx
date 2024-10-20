import { Value } from "sass";
import styles from "./card.module.scss"
interface DataItem {
	href: string;
	[key: string]: string | number | unknown;
  }

export default async function Index(){
	const res = await fetch(`http://localhost:8081/`);
	const data = await res.json();
	console.log(data)
	return <div className={styles.container}>{Object.entries(data).map(
		([key, value]) =>
		<a href={(value as DataItem).href} key={key} className={styles.card}><h2>{key}</h2>

		<ol>			{Object.entries((value as DataItem)).map(([key2,value2]) =>
				<li key={key2}>
					<h3>{key2}</h3>
					<p>{String(value2) }
					</p>
				</li>)
		}</ol>

		</a>
	)}</div>
}