import React, { useEffect } from 'react'
import { Card, Col, Row, Skeleton, Input, Spin } from 'antd'
import VisibilitySensor from "react-visibility-sensor";
import Customcard from '../Customcard'

import './index.less'

export default function ({ data, flag, hasMore, loading, loadMore }: any) {
    const CustomCard = flag ? Customcard.Achievement : Customcard.Resource
    function handelLoading(item) {
        if (item) {
            loadMore()
        }
    }
    return (
        <div className="infinite-container">
            <Card
                className="List"
                extra={<Input.Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)} />}>
                <Skeleton loading={loading} active>
                    <Row style={{ width: '100%', margin: 0 }} gutter={16}>
                        {data.map((item: any) => {
                            return <Col md={12} sm={24} span={12} key={item.id}>
                                <CustomCard data={item} />
                            </Col>
                        })}
                        {
                            hasMore && <VisibilitySensor onChange={handelLoading}>
                                <Spin />
                            </VisibilitySensor>
                        }
                    </Row>
                </Skeleton>
            </Card>
        </div>
    )
}
