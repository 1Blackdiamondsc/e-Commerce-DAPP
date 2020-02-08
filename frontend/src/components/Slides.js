import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
//import '../CSS/carousal.css'

const items = [
  {
    src: './images/onlineshopping.jpg',
    altText: 'Slide 1',
    caption: 'Peer to Peer',
    content: 'No Middle Man'
  },
  {
    src: './images/PeerToPeer.png',
    altText: 'Slide 2',
    caption: 'Slide 2',
    content: ""
  },
  {
    src: './images/network.jpg',
    altText: 'Slide 3',
    caption: 'Slide 3',
    content: ""
  },
  {
    src: './images/product.png',
    altText: 'Slide 4',
    caption: 'Slide 4',
    content: ""
  },
  {
    src: './images/product-info.jpg',
    altText: 'Slide 5',
    caption: 'Slide 5',
    content: ""
  }
];

const carsoulCaption={
  fontSize:"30px",
  fontColor:"red"
}
class Slides extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slide = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
          slide
        >
          <div className="CarouselCont">
            <div className="ImgCont">
              <img width="100%" height="500px" src={item.src} alt={item.altText} />
            </div>
            <div className="TextCont">
              <CarouselCaption captionText={item.content} captionHeader={item.caption} cssModule={carsoulCaption}/>
            </div>
          </div>
        </CarouselItem>
      );
    });

    return (
      <Carousel pause="hover" interval="2000"
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slide}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}


export default Slides;