import React, { useState, useEffect } from 'react'
import { Layout, Avatar, Divider, Radio, Skeleton, Spin } from 'antd'
import { connect, Link } from 'umi'
import VisibilitySensor from "react-visibility-sensor";

import Banner from '../components/swiper'

import './index.less'

const { Sider, Content } = Layout

function Article({ dispatch, allData, data, banner, tags, defaultTag, loading, hasMore, hot }: any) {
    useEffect(() => {
        // dispatch({
        //     type: 'article/save',
        //     payload: {
        //         loading: true
        //     }
        // })
        dispatch({
            type: 'article/InitArticleAndTag'
        })
    }, [])

    function filterArticleByTag(event) {
        dispatch({
            type: 'article/filterArticleByTag',
            payload: {
                tag: event.target.value
            }
        })
    }
    function handelLoading(flag) {
        console.log("测试")
        setTimeout(() => {
            if (!flag) {
                return
            }
            if (allData.length - data.length === 0) {
                dispatch({
                    type: 'article/save',
                    payload: {
                        hasMore: false
                    }
                })
                return
            }
            let offset = 6
            if (allData.length - data.length < offset) {
                offset = allData.length - data.length
            }
            dispatch({
                type: 'article/save',
                payload: {
                    pageData: allData.slice(0, data.length + offset)
                }
            })
        }, 500)

    }

    return (
        <Layout className="article-container">
            <Content>
                <Banner data={banner} />
                <Skeleton loading={loading} active>
                    <div className="article-list">
                        {data.map(item => {
                            return <div className="article-item" key={item.id}>
                                <div className="article-item-left" style={{ backgroundImage: `url(${item.postlink})` }}></div>
                                <div className="article-item-right">
                                    <Link className="article-link" to={`/articleInfo/${item.id}`}>
                                        <div className="article-ir-title">{item.title}</div>
                                        <div className="article-ir-content">{item.abstract}</div>
                                    </Link>
                                    <div className="article-ir-info">
                                        <div>阅读数：{' ' + item.readnumber}</div>
                                        <Link className="article-link" to={`/UserInfo/${item.userid}`}>
                                            <Avatar src={item.avatar} />&nbsp;&nbsp;
                                        {" " + item.username}
                                        </Link>
                                        <div>{item.created_at}</div>
                                        <div>{item.technologyname}</div>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                    {
                        hasMore && <div className="loading">
                            <VisibilitySensor onChange={handelLoading}>
                                <span>
                                    <Spin />
                                    <span>加载中...</span>
                                </span>


                            </VisibilitySensor>
                        </div>

                    }
                </Skeleton>
            </Content>

            <Sider width={260}>
                <div className="article-tags">
                    <div className="article-tags-title">
                        <Divider orientation="left">标签云</Divider>
                        <Radio.Group value={defaultTag} className="article-tags-container" onChange={filterArticleByTag}>
                            <Radio.Button value={-1} key={-1} >推荐</Radio.Button>{
                                tags.map(item => {
                                    return <Radio.Button value={item.id} key={item.id} >{item.name}</Radio.Button>
                                })
                            }
                        </Radio.Group>
                    </div>
                </div>
                <div className="article-hot">
                    <Divider orientation="left">热门文章</Divider>
                    <div className="article-hot-container">{
                        hot.map(item => {
                            return <div key={item.id} className="article-hot-item">
                                <div className="hot-title">
                                    <Link to={`/articleInfo/${item.id}`}>{item.title}</Link>
                                </div>
                                <div className="hot-info">阅读数：{' ' + item.readnumber}</div>
                            </div>
                        })
                    }

                    </div>
                </div>
            </Sider>
        </Layout>

    )
}

function mapStateToProps({ article }) {
    return {
        data: article.pageData,
        banner: article.banner,
        tags: article.tags,
        defaultTag: article.defaultTag,
        loading: article.loading,
        hasMore: article.hasMore,
        allData: article.filter,
        hot: article.hotArticle
    }
}

export default connect(mapStateToProps)(Article)