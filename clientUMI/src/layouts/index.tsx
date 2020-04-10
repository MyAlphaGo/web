import React, { useEffect, useState } from "react"
import { Layout, Menu } from 'antd'
import { connect } from 'umi'

import HeaderNav from '../pages/components/HeaderNav'

const { Header, Footer, Sider, Content } = Layout;

import './index.less'

const mapStateToProps = ({ auth }) => {
    return {
        isLogin: auth.isLogin
    }
}

export default connect(mapStateToProps)((props: any) => {
    useEffect(() => {
        const token = localStorage.getItem('token')
        let flag = false
        if (!token) {
            if (props.location.pathname !== '/register') {
                props.history.push('/login')
            }
        }else{
            flag = true
        }
        props.dispatch({
            type: 'auth/save',
            isLogin: flag
        })
    }, [props.location.pathname]);

    return (
        <div>
            <Layout>
                <Header>
                    <HeaderNav location={props.location.pathname}></HeaderNav>
                </Header>
                <Content>
                    <div className="container">
                        {props.children}
                    </div>
                </Content>
                <Footer></Footer>
            </Layout>
        </div>
    )
})
