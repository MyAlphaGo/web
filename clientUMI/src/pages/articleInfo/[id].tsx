import { connect } from 'umi'
import React,{ useEffect } from 'react'
import { Avatar,Button } from 'antd'

import './index.less'
import Item from '../UserInfo/[id]/[item]'
function ArticleInfo({ dispatch, match, article }) {
    useEffect(() => {
        console.log(match)
        dispatch({
            type: 'article/getArticleInfoById',
            payload: {
                id: match.params.id
            }
        })
    }, [])

    return (
        <div>
            <div className="header" style={{ backgroundImage: `url(${article.postlink})` }}>
                <div className="header-tag">
                    <Button ghost size='large' shape='round'>{article.menuname}</Button>
                    <Button ghost size='large' shape='round'>{article.technologyname}</Button>
                    <Button ghost size='large' shape='round'>{article.keywords}</Button>
                </div>
                <div className="header-title">{article.title}</div>
                <div className="header-userinfo">
                    <Avatar src={article.avatar} />
                    <span>{article.username}</span>
                    <span>{article.created_at}</span>
                </div>
            </div>
            <div className="body" dangerouslySetInnerHTML={{ __html: article.context }}>
            </div>
        </div>
    )
}

function mapStateToProps({ article }) {
    return {
        article: article.item
    }
}
export default connect(mapStateToProps)(ArticleInfo)
