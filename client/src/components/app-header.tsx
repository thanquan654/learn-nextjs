import { SwitchThemeBtn } from '@/components/switch-theme-btn'
import Link from 'next/link'
import React from 'react'

const AppHeader = () => {
	return (
		<div className="flex justify-end items-center gap-5 w-full px-3 py-3 bg-slate-500 top-0 absolute">
			<SwitchThemeBtn />
			<div className="flex gap-3">
				<Link href="/login">Đăng nhập</Link>
				<Link href="/register">Đăng ký</Link>
			</div>
		</div>
	)
}

export default AppHeader
