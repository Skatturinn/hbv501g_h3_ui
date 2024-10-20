'use client'
import { useForm } from "react-hook-form";
import { group, notandi, project } from "@/types/types";
import { useState } from "react";
import styles from "./Paths.module.scss";


export function Post({ type, id, method }: { type: 'users' | 'patterns', id?: string, method: 'PATCH' | 'POST' }) {
	const { register, handleSubmit, control, formState: { errors } } = useForm<FormData | notandi | group | project>();
	const [error, setError] = useState('')
	function Input({ label, type, field, required = false }: { label: string, type: string, field: keyof notandi | keyof group | keyof project, required?: boolean }) {
		return <label>
			{label}
			<input type={type}
				{...register(field, { required })}
			/>
		</label>
	}
	const FormPost = async (data: FormData | notandi | group | project) => {
		try {
			const response = await fetch(`http://localhost:8081/${type}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'					},
					credentials: 'omit',
					body: JSON.stringify(filterEmptyStrings(data))
				}
			)
			const message = await response.json()
			if (response.status >= 200 && response.status < 300) {
				setError(`Tókst að búa til ${message && message?.id || 'lið'} í ${type}`)
			} else {
				setError(`${response.status}: ${response.statusText} ${message && (message?.error || JSON.stringify(message))}`)
			}
		} catch (err) {
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			err && setError(JSON.stringify(err));
		}
	}
	return <>
		<form
			onSubmit={handleSubmit(FormPost)}
			className={styles.post}
		>
			{
				type === 'users' &&
				<>
					<Input label="Notendanafn" type="text" field="username" required={true} />
					<Input label="Lykilorð" type="text" field="password" required={true} />
					<Input label="email" type="text" field="email" />
				</>
			}
			{
				type === 'patterns' &&
				<>
					<Input label="Nafn" type="text" field="name" />
					<Input label="PatternMatrix" type="text" field="patternMatrix"/>
					<Input label="colorScheme" type="text" field="colorScheme"/>

				</>

			}
			{
				error ?
					<p>{error}</p>
					: ''
			}
			{
				Object.keys(errors).length ?
					<p>{JSON.stringify(errors.root?.message)}</p>

					: ''
			}
			<button>Submit</button>
		</form>
	</>
}