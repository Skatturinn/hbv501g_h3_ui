'use client'
import { useForm } from 'react-hook-form';
import { useState } from 'react';

// Define interfaces for User and Pattern
interface User {
  username: string;
  password: string;
  email?: string;
}

interface Pattern {
  name: string;
  patternMatrix: string;
  colorScheme: string;
}

interface FormDataProps {
  type: 'users' | 'patterns';
  method: 'PATCH' | 'POST';
}

export function Post({ type, method }: FormDataProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<User | Pattern>();
  const [error, setError] = useState('');

  // Input component
  function Input({ label, type, field, required = false }: { label: string, type: string, field: keyof User | keyof Pattern, required?: boolean }) {
    return (
      <label>
        {label}
        <input type={type} {...register(field, { required })} />
      </label>
    );
  }

  // Form submit function
  const onSubmit = async (data: User | Pattern) => {
    try {
      const response = await fetch(`https://hbv501gh3-production.up.railway.app/${type}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
		credentials: 'omit',
      });

      const result = await response.json();
      if (response.ok) {
        setError(`Success: Created ${result?.id || 'entry'} in ${type}`);
      } else {
        setError(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      setError(`Error: ${JSON.stringify(err)}`);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {type === 'users' && (
          <>
            <Input label="Username" type="text" field="username" required />
            <Input label="Password" type="password" field="password" required />
            <Input label="Email" type="email" field="email" />
          </>
        )}

        {type === 'patterns' && (
          <>
            <Input label="Name" type="text" field="name" required />
            <Input label="Pattern Matrix" type="text" field="patternMatrix" required />
            <Input label="Color Scheme" type="text" field="colorScheme" required />
          </>
        )}

        {error && <p>{error}</p>}
        {Object.keys(errors).length > 0 && <p>{JSON.stringify(errors)}</p>}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
