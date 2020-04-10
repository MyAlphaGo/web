import { Card, Button, Skeleton } from 'antd'
import { Link } from 'umi'
import React from 'react'
import { PhoneOutlined, SmileOutlined, MailOutlined, IdcardOutlined } from '@ant-design/icons'
import "./index.less"

function MemberList({ userList, grade, loading }) {
    return (
        <div className="memberList">
            {grade.map(item => {
                return <Card
                    className="memberList-item"
                    key={item}
                    title={item}>
                    <Skeleton loading={loading} active>
                        {
                            userList[item].map(item1 => {
                                return <Card key={item1.id} className="member-item" hoverable={true}>
                                    <div className="member-item-left">
                                        <div className="member-item-avatar">
                                            <img src={item1.avatar} className="member-item-img" />
                                        </div>

                                        <Button type="primary">
                                            <Link to={'/UserInfo/' + item1.id + '/topic'}>查看详情</Link>
                                        </Button>
                                    </div>
                                    <div className="member-item-right">
                                        <div className="member-item-right-name"><h2>{item1.User.name}</h2></div>
                                        <div className="member-item-right-text">
                                            <i><PhoneOutlined /></i>
                                            <span>{item1.phone}</span>
                                        </div>
                                        <div className="member-item-right-text">
                                            <i><MailOutlined /></i>
                                            <span>{item1.User.email}</span>
                                        </div>
                                        <div className="member-item-right-text">
                                            <i><IdcardOutlined /></i>
                                            <span>{item1.School.name + '/' + item1.Major.name}</span>
                                        </div>
                                        <div className="member-item-right-text">
                                            <i><SmileOutlined /></i>
                                            <span>{item1.description}</span>
                                        </div>
                                    </div>
                                </Card>
                            })
                        }
                    </Skeleton>

                </Card>
            })}

        </div>
    )
}
export default MemberList
