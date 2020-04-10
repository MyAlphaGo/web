import React, { useEffect, useState } from "react"
import { Layout, Menu } from 'antd'
import { Link } from 'umi'

import HeaderNav from '../pages/components/HeaderNav'

const { Header, Footer, Sider, Content } = Layout;

import './index.less'
export default function (props: any) {

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
}
