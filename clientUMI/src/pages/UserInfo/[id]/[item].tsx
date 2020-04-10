import React, { useEffect } from 'react'
import { List, Tag, Card, Select, Input, Menu } from 'antd'
import { connect, history } from 'umi'
import './index.less'

const { Option } = Select
const { Search } = Input
const { Meta } = Card

function Item({ dispatch, match, list, tags,loading }: any) {
    const userMenu = [
        { name: '课题', key: `/UserInfo/${match.params.id}/topic` },
        { name: '文章', key: `/UserInfo/${match.params.id}/article` },
        { name: '成果', key: `/UserInfo/${match.params.id}/achievement` },
        { name: '资源', key: `/UserInfo/${match.params.id}/resource` },
        { name: '收藏', key: `/UserInfo/${match.params.id}/love` }

    ]
    const tagColor = ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"]
    function menuSwitch(item: any) {
        history.push(item.key)
    }
    useEffect(() => {
        let index = 0
        if (match.params.item === "article") {
            index = 1
        } else if (match.params.item === "achievement") {
            index = 2
        } else if (match.params.item === "resource") {
            index = 3
        } else if (match.params.item === "love") {
            index = 4
        }
        dispatch({
            type: 'aar/getArticleAndTag',
            payload: {
                index,
                id: match.params.id
            }
        })
    }, [match.params.item]);
    function handleChange(tag: any) {
        dispatch({
            type: 'aar/filterByTag',
            payload: {
                tag
            }
        })
    }
    return (
        <div className="listContainer">
            <Menu
                className="content-body-navbar"
                mode="horizontal"
                defaultSelectedKeys={[`/UserInfo/${match.params.id}/${match.params.item}`]}
                onSelect={menuSwitch}>{
                    userMenu.map(item => {
                        return <Menu.Item key={item.key} >{item.name}</Menu.Item>
                    })}
            </Menu>
            <div className="content-body-list">


                <Card
                    title={
                        <div>
                            <Select defaultValue={-1} style={{ width: 120 }} onChange={handleChange}>
                                <Option value={Number(-1)} key={Number(-1)}>{'全部文章'}</Option>
                                {tags.map((item: any) => {
                                    return <Option value={item.id} key={item.id}>{item.name}</Option>
                                })}
                            </Select>
                        </div>
                    }
                    extra={
                        <div>
                            <Search
                                placeholder="input search text"
                                onSearch={value => console.log(value)}
                                style={{ width: 200 }}
                            />
                        </div>
                    }>
                    <List key="list"
                        header={
                            <List.Item key="0">
                                <p>文章名称</p>
                                <p>技术标签</p>
                                <p>发布时间</p>
                            </List.Item>
                        }
                        dataSource={list}
                        renderItem={(item: any) => (
                            <List.Item key={item.id}>
                                <p><a href={item.link}>{item.title}</a></p>
                                <p><Tag color={tagColor[item.tag['id'] % 11]} >{item.tag['name']}</Tag></p>
                                <p>{item.created_at}</p>
                            </List.Item>
                        )}
                    >
                    </List>
                </Card>
            </div>

        </div>
    )
}
function mapStateToProps({ aar }: any) {
    return {
        list: aar.list,
        tags: aar.tags,
        loading: aar.loading
    }
}
export default connect(mapStateToProps)(Item)