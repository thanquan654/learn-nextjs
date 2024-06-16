'use client'
import React from 'react'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { registerUser } from '@/api/auth.api'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

const registerFormSchema = z
	.object({
		name: z
			.string()
			.trim()
			.min(2, {
				message: 'Tên phải có độ dài từ 2 đến 256 kí tự',
			})
			.max(256, {
				message: 'Tên phải có độ dài từ 2 đến 256 kí tự',
			}),
		email: z.string().email({
			message: 'Không đúng định dạng email',
		}),
		password: z
			.string()
			.min(6, {
				message: 'Mật khẩu phải có tối thiểu 6 kí tự',
			})
			.max(50),
		confirmPassword: z
			.string()
			.min(6, {
				message: 'Mật khẩu phải có tối thiểu 6 kí tự',
			})
			.max(50),
	})
	.strict()
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Mật khẩu không trùng khớp',
		path: ['confirmPassword'],
	})

export type RegisterFormType = z.infer<typeof registerFormSchema>

const RegisterForm = (
	props: React.JSX.IntrinsicAttributes &
		React.ClassAttributes<HTMLFormElement> &
		React.FormHTMLAttributes<HTMLFormElement>,
) => {
	const router = useRouter()
	const { toast } = useToast()
	const form = useForm<RegisterFormType>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	})
	const onSubmit = async (data: RegisterFormType) => {
		console.log(data)
		const result = await registerUser(data)

		console.log('🚀 ~ file: register-form.tsx:68 ~ result:', result)

		if (result.status === 422) {
			form.setError('root', {
				message: result.error.message,
			})
		} else {
			toast({
				description: 'Đăng ký tài khoản thành công',
			})
			router.push('/')
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} noValidate {...props}>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="my-3">
							<FormLabel className="font-bold">
								Tên hiển thị
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Tên hiển thị"
									aria-label="name"
									autoComplete="name"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

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
									autoComplete="new-password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem className="my-3">
							<FormLabel className="font-bold">
								Xác nhận mật khẩu
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Nhập lại mật khẩu"
									type="password"
									aria-label="password"
									autoComplete="new-password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="w-full my-3"
					disabled={form.formState.isLoading}
				>
					Đăng ký
				</Button>
				<FormLabel className="text-red-800">
					{form.formState.errors.root?.message}
				</FormLabel>
			</form>
		</Form>
	)
}

export default RegisterForm
