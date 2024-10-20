'use client'
import React, { useEffect, useState } from 'react';
import styles from "./card.module.scss";
import { usePathname } from 'next/navigation';

interface DataItem {
	href?: string;
	[key: string]: string | number | unknown;
}

export default function Get() {
	const [data, setData] = useState<DataItem | null>(null);
	const pathname = usePathname(); // Dynamically use pathname for fetch

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`http://localhost:8081${pathname}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
					credentials: 'omit', // Credentials omitted, adjust if needed
				});

				if (!res.ok) {
					throw new Error(`Error: ${res.status}`);
				}

				const dat = await res.json();
				console.log("Fetched data:", dat); // Log the data once when it's fetched
				setData(dat);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		// Fetch data when pathname changes
		if (pathname) {
			fetchData();
		}
	}, [pathname]); // Add pathname to dependency array so it fetches on path change

	return (
		<>
			{!data ? (
				<p>Loading...</p>
			) : (
				<ul className={styles.container2}>
					{/* Use Object.entries and map to render the data */}
					{Object.entries(data?._embedded?.userList || data?._embedded?.patternList || data).map(([key, value]) => (
						<li key={key} className={styles.card}>
							<h3>{key}</h3>
							{/* Conditionally render if value is an object */}
							{typeof value === 'object' && value !== null ? (<>
								<a href={pathname + "/" + String(value?.id) || undefined}>
								<ul>
									{Object.entries(value).map(([key2, value2]) => (
										<li key={key2}>
											<h4>{key2}</h4>
											<p>{String(value2)}</p>
										</li>
									))}
								</ul>
								</a>
								{value?.id ? <button onClick={() =>
{
	fetch(`http://localhost:8081${pathname}/${value.id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'omit', // Credentials omitted, adjust if needed
	}).then(() => history.go());
}
								}>Eyða</button> : ''}</>
							) : (
								<p>{String(value)}</p>
							)}
						</li>
					))}
				</ul>
			)}
		</>
	);
}
