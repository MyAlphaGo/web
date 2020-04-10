import React, { useEffect, useState } from 'react'
import { connect } from 'umi'
import { Layout } from 'antd'

import Classify from '../components/Classify'
import AchievementList from '../components/List'
import './index.less'

const { Sider, Content } = Layout

function Achievement({ achievement, achievementType, dispatch, hasMore, loading, achievementAll }: any) {

    useEffect(() => {
        dispatch({
            type: 'achievement/save',
            payload: {
                loading: true
            }
        })
        dispatch({
            type: 'achievement/getAchievementAndTag'
        })
    }, []);

    function filterAchievement(tagId: Number) {
        dispatch({
            type: 'achievement/filterAchievementByTag',
            payload: {
                tag: tagId
            }
        })
    }
    function loadMore() {
        if (achievementAll.length - achievement.length === 0) {
            dispatch({
                type: 'achievement/save',
                payload: {
                    hasMore: false
                }
            })
            return
        }
        let offset = 6
        if (achievementAll.length - achievement.length < offset) {
            offset = achievementAll.length - achievement.length
        }
        dispatch({
            type: 'achievement/save',
            payload: {
                pageList: achievementAll.slice(0, achievement.length + offset)
            }
        })
    }

    return (
        <Layout>
            <Sider
                breakpoint="md"
                collapsedWidth="0"
                width={250}>
                <Classify title="成果管理" data={achievementType} onhandleClassify={filterAchievement} />
            </Sider>
            <Content>
                <AchievementList data={achievement} flag={true} hasMore={hasMore} loading={loading} loadMore={loadMore} />
            </Content>
        </Layout>
    )
}
function mapStateToProps({ achievement }: any) {
    return {
        achievement: achievement.pageList,
        achievementAll: achievement.list,
        achievementType: achievement.tags,
        hasMore: achievement.hasMore,
        loading: achievement.loading
    }
}

export default connect(mapStateToProps)(Achievement)
