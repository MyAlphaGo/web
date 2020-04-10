import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import {connect} from 'umi'
import './index.less'
import { useEffect } from 'react'

const NormalLoginForm = ({dispatch}) => {
    useEffect(()=>{
        dispatch({
            type:'auth/getTime',
        })
    },[])
    
    const onFinish = values => {
        console.log("开始登录")
        dispatch({
            type:'auth/login',
            payload:{
                userId: values.username,
                password: values.password
            }
        })
    }

    return (
        <div id="login">
            <h1>用户登录</h1>
            <Form
                size="large"
                name="login-"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a href="">register now!</a>
                </Form.Item>


            </Form>
        </div>
    )
}

export default connect()(NormalLoginForm)