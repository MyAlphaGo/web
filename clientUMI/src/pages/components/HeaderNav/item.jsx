import { Link } from 'umi'
import './index.less'
const Item = (({ name, isSelected, link,handleClick,index }) => {
    const active = 'active'
    return (
        <div onClick={handleClick.bind(this,index)}>
            <Link to={link} className={isSelected?'active':undefined}>{name}</Link>
        </div>

    )
})
export default Item