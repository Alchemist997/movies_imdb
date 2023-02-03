import React, { Component } from "react";
import Slider from "react-slick";
import CardSlick from '../cards/CardSlick';

export default class SlickSlider extends Component {
    render() {
        var settings = {
            dots: false,
            arrows: false,
            infinite: this.props.list.length > 4 ? true : false,
            autoplay: this.props.list.length > 4 ? true : false,
            className: this.props.className || '',
            speed: 1000,
            autoplaySpeed: 5000,
            slidesToShow: 4,
            slidesToScroll: 2,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 799,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                },
                {
                    breakpoint: 512,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        const props = this.props;

        return (
            <Slider {...settings}>
                {props.list.map(el => <CardSlick
                    key={el.id}
                    movieID={el.id}
                    title={el.title}
                    rate={el.imDbRating}
                    imgSrc={el.image}
                />)}
            </Slider>
        );
    }
}