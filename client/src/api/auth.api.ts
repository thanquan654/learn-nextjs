import { LoginFormType } from '@/components/auth/login-form'
import { RegisterFormType } from '@/components/auth/register-form'
import { error } from 'console'

export const registerUser = async (registerData: RegisterFormType) => {
	const result = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/register`,
		{
			method: 'POST',
			body: JSON.stringify(registerData),
			headers: {
				'Content-Type': 'application/json',
			},
		},
	)

	const data = await result.json()
	if (result.ok) {
		return {
			status: result.status,
			message: data.message,
			token: data.data.token,
		}
	} else {
		return {
			status: result.status,
			message: data.message,
			error: data.errors[0],
		}
	}
}

export const loginUser = async (loginData: LoginFormType) => {
	const result = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/login`,
		{
			method: 'POST',
			body: JSON.stringify(loginData),
			headers: {
				'Content-Type': 'application/json',
			},
		},
	)

	const data = await result.json()

	if (result.ok) {
		return {
			status: result.status,
			message: data.message,
			token: data.data.token,
			account: data.data.account,
		}
	} else {
		return {
			status: result.status,
			message: data.message,
			error: data.errors[0],
		}
	}
}
