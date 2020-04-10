import React from 'react'
import { Button, Card, Avatar } from 'antd'
import { CalendarOutlined, UserOutlined } from '@ant-design/icons'

import './achievement.less'
export default function ({ data }: any) {


    return (
        <Card className="achievement"
            cover={<img src={data.posterlink} alt="" />}
            actions={[
                <div className="achievement-foolter-user">
                    <UserOutlined />
                    <span>{data.username}</span>
                </div>,
                <div className="achievement-foolter-date">
                    <CalendarOutlined />
                    <span>{data.created_at}</span>
                </div>
            ]}>
            <Card.Meta
                avatar={<Avatar size={32} src={data.avatar} alt="图片丢失" />}
                title={data.title}
                description={data.abstract} />


        </Card>
    )
}
