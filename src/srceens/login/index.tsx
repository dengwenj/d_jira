import React, { FormEvent } from 'react';
import { login } from 'api/hh';
interface ILoginParam {
  username: string
  password: string
}

export default function Login() {
  const handleLogin = async (params: ILoginParam) => {
    const res = await login(params)
    console.log(res);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const username = (e.currentTarget.elements[0] as HTMLInputElement).value
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value

    handleLogin({ username, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="">用户名</label>
        <input type="text" id='username' />
      </div>
      <div>
        <label htmlFor="">密码</label>
        <input type="password" id='password' />
      </div>
      <button>登录</button>
    </form>
  )
}
