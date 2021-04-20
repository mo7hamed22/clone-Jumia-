import React from 'react';
import AliceCarousel from 'react-alice-carousel';
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
    items.push(<div className="item" key={item._id} data-value={item._id}>{item.brand}</div>)
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

