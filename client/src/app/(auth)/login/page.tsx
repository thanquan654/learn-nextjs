import LoginForm from '@/components/auth/login-form'
import React from 'react'

const LoginPage = () => {
	return (
		<div className="flex justify-between gap-4 h-screen max-w-[1200px] px-5 mx-auto">
			<div className="flex-1 flex justify-center items-center font-bold text-3xl">
				Đăng nhập
			</div>
			<div className="flex-1 w-[300px] flex flex-col gap-4 justify-center items-center ">
				<h1 className="font-bold text-xl">Đăng nhập</h1>
				<LoginForm className="p-6 dark:bg-slate-800 bg-slate-100 rounded-md w-full max-w-[400px] shadow-md" />
			</div>
		</div>
	)
}

export default LoginPage
