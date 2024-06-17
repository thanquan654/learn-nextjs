'use client'

import { loginUser } from '@/api/auth.api'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const loginFormSchema = z
	.object({
		email: z.string().email({
			message: 'Không đúng định dạng email',
		}),
		password: z
			.string()
			.min(6, {
				message: 'Mật khẩu phải có tối thiểu 6 kí tự',
			})
			.max(50),
	})
	.strict()

export type LoginFormType = z.infer<typeof loginFormSchema>

const LoginForm = (
	props: React.JSX.IntrinsicAttributes &
		React.ClassAttributes<HTMLFormElement> &
		React.FormHTMLAttributes<HTMLFormElement>,
) => {
	const { toast } = useToast()
	const router = useRouter()

	const form = useForm<LoginFormType>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})
	const onSubmit = async (data: LoginFormType) => {
		const result = await loginUser(data)

		console.log('🚀 ~ file: login-form.tsx:55 ~ result:', result)

		if (result.status === 422) {
			form.setError('root', {
				message: result.error.message,
			})
		} else {
			toast({
				description: `Chào mừng ${result.account.name}`,
			})
			router.push('/')
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} noValidate {...props}>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className="my-3">
							<FormLabel className="font-bold">Email</FormLabel>
							<FormControl>
								<Input
									placeholder="Email"
									type="email"
									aria-label="email"
									autoComplete="email"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem className="my-3">
							<FormLabel className="font-bold">
								Mật khẩu
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Mật khẩu"
									type="password"
									aria-label="password"
									autoComplete="current-password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					disabled={form.formState.isLoading}
					className="w-full my-3"
				>
					Đăng nhập
				</Button>
				<FormLabel className="text-red-800">
					{form.formState.errors.root?.message}
				</FormLabel>
			</form>
		</Form>
	)
}

export default LoginForm
