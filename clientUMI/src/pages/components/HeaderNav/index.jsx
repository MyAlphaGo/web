import Item from './item'
import React, { useState, useEffect } from 'react'
const HeaderNav = ({ location }) => {

    const [menu, setmenu] = useState([
        { name: '团队动态', isSelected: false, link: '/article' },
        { name: '资源分享', isSelected: false, link: '/resource' },
        { name: '成果展示', isSelected: false, link: '/achievement' },
        { name: '成员展示', isSelected: false, link: '/member' },
        { name: '注册', isSelected: false, link: '/register' },
        { name: '登录', isSelected: false, link: '/login' }
    ]);
    const [select, setselect] = useState(-1);

    useEffect(() => {
        let temp = menu
        let index = -1
         temp.map((item, i) => {
            if (item.link === location) {
                index = i
            }
        })
        if (select !== -1) {
            temp[select].isSelected = false
        }
        setselect(index)
        if (index!==undefined&&index!==-1) {
            temp[index].isSelected = true
        }
        setmenu(temp)
    }, [location]);


    const handleClick = (item) => {
        let lmenu = menu
        if (select !== -1) {
            lmenu[select].isSelected = false
        }
        setselect(item)
        lmenu[item].isSelected = true
        setmenu(lmenu)
    }


    return (
        <div className='header-nav-container'>
            <div className="fl">
                <div className="logo"></div>
                {
                    menu.map((item, i) => {
                        if (i <= 3) {
                            return <Item
                                key={i}
                                index={i}
                                name={item.name}
                                isSelected={item.isSelected}
                                link={item.link}
                                handleClick={handleClick} />
                        }

                    })
                }
            </div>
            <div className='fr'>{
                menu.map((item, i) => {
                    if (i > 3) {
                        return (<Item
                            key={i}
                            index={i}
                            name={item.name}
                            isSelected={item.isSelected}
                            link={item.link}
                            handleClick={handleClick} />)
                    }

                })
            }

            </div>

        </div>
    )
}

export default HeaderNav