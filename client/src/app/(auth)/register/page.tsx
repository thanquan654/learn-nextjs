import RegisterForm from '@/components/auth/register-form'
import React from 'react'

const RegisterPage = () => {
	return (
		<div className="flex justify-between gap-4 h-screen max-w-[1200px] px-5 mx-auto">
			<div className="flex-1 flex justify-center items-center font-bold text-3xl">
				Đăng ký
			</div>
			<div className="flex-1 w-[300px] flex flex-col gap-4 justify-center items-center ">
				<h1 className="font-bold text-xl">Đăng ký</h1>
				<RegisterForm className="p-6 dark:bg-slate-800 bg-slate-100 rounded-md w-full max-w-[400px] shadow-md" />
			</div>
		</div>
	)
}

export default RegisterPage
