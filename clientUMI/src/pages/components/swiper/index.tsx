import { Link } from 'umi'
import React from 'react'
import { Carousel, Card } from 'antd'

import './index.less'


function Banner({ data }:any) {
    return (
        <div className='swiper-container'>
            <Carousel autoplay={true}>{
                data.map(item => {
                    return <Link className="swiper-item" key={item.id} to={`articleInfo/${item.id}`}>
                        <div className="swiper-item-img" style={{backgroundImage:`url(${item.postlink})`}}></div>
                        <span className="swiper-item-title">{item.title}</span>
                    </Link>
                })
            }
            </Carousel>
        </div>
    )
}
export default Banner