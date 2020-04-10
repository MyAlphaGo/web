import React, { useEffect } from 'react'
import { Layout } from 'antd'
import { connect } from 'umi'

import Classify from '../components/Classify'
import ResourceList from '../components/List'

const { Sider, Content } = Layout

function Resource({ resourceType, resource,resourceAll, dispatch, hasMore, loading }: any) {
    useEffect(() => {
        dispatch({
            type: 'resource/getResourceAndTag',
        })
    }, []);

    function filterResource(tag: Number) {
        dispatch({
            type: 'resource/filterResourceByTag',
            payload: {
                tag
            }
        })
    }
    function loadMore() {
        if (resourceAll.length - resource.length === 0) {
            dispatch({
                type: 'resource/save',
                payload: {
                    hasMore: false
                }
            })
            return
        }
        let offset = 6
        if (resourceAll.length - resource.length < offset) {
            offset = resourceAll.length - resource.length
        }
        dispatch({
            type: 'resource/save',
            payload: {
                pageList: resourceAll.slice(0, resource.length + offset)
            }
        })
    }
    return (
        <Layout>
            <Sider
                breakpoint="md"
                collapsedWidth="0"
                width={250}>
                <Classify title="资源分类" data={resourceType} onhandleClassify={filterResource} />
            </Sider>
            <Content>
                <ResourceList data={resource} flag={false} hasMore={hasMore} loading={loading} loadMore={loadMore} />
            </Content>
        </Layout>
    )
}

function mapStateToProps({ resource }: any) {
    return {
        resourceType: resource.tags,
        resourceAll: resource.list,
        resource: resource.pageList,
        hasMore: resource.hasMore,
        loading: resource.loading,
    }
}
export default connect(mapStateToProps)(Resource)