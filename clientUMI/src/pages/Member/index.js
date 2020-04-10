import { connect } from 'umi'
import React, { useEffect, useState } from 'react'
import { Layout } from 'antd'
import Classify from '../components/Classify'
import MemberList from '../components/MemberList'
const { Sider, Content } = Layout

const MemberData = (({ dispatch, member,grade,domain,loading}) => {
    useEffect(() => {
        dispatch({
            type: 'member/getMembers',
        })
    }, []);


    function filterUser(domainId) {
       dispatch({
           type: 'member/filterUser',
           domainId
       })
    }

    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                width={250}>
                <Classify title="成员分类" data={domain} onhandleClassify={filterUser} />
            </Sider>

            <Content>
                <MemberList userList={member} grade={grade} loading={loading}></MemberList>
            </Content>
        </Layout>
    )
})

function mapStateToProps({member}) {
    return {
        domain: member.domain,
        grade:member.grade,
        member: member.member,
        loading:member.loading
    }
}

export default connect(mapStateToProps)(MemberData)
