import { Value } from "sass";



export default async function Index(){
	const res = await fetch(`http://localhost:8081`);
	const data = await res.json();
	console.log(data)
	return <>{Object.entries(data).map(
		([key, value]) =>
		<a href={value.href} key={key}><h2>{key}</h2>

		<ol>			{Object.entries(value).map(([key2,value2]) =>
				<li key={key2}>
					<h3>{key2}</h3>
					<p>{String(value2) }</p>
				</li>)
		}</ol>

		</a>
	)}</>
}