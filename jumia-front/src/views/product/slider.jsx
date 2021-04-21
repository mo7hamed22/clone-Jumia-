import React from 'react';
import { Link } from "react-router-dom";
import AliceCarousel from 'react-alice-carousel';
import {formatTitle} from "../../pipes/formatTitle";
import 'react-alice-carousel/lib/alice-carousel.css';
function Slider(props) {
const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
};

// const items = [
//     <div className="item" data-value="1">1</div>,
//     <div className="item" data-value="2">2</div>,
//     <div className="item" data-value="3">3</div>,
//     <div className="item" data-value="4">4</div>,
//     <div className="item" data-value="5">5</div>,
// ];

let items = [];

props.data.map((item=>
    items.push(    
        <div className="card text-center m-3">
            <div className="card-body">
            <Link className="text-decoration-none" to={`/product/detail/${item.nameEn}`}>
                <img src={item.image} style={{width:'100px'}}/>
                <h6 className="card-title text-capitalize">{formatTitle(item.nameEn)}</h6>
                <div className="card-text text-success"> {item.brand}</div>
                <small className="text-muted">{item.brand}</small>
            </Link>
            </div>
        </div>    
        )
        ))

return (
    <AliceCarousel
        mouseTracking
        items={items}
        responsive={responsive}
        controlsStrategy="alternate"
    />
)
}

export default Slider

