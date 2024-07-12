import React, { MutableRefObject, useEffect, useRef } from 'react';

const BaseNerdzCarousel = () => {
    const BASE_PATH = "https://ipfs.io/ipfs/QmZD2nh9f7mRrihdefwGGmBY7sFdWQ1vynuaY2AULaQXt4/<X>.png";
    const images = [
        BASE_PATH.replace("<X>", "94"),
        BASE_PATH.replace("<X>", "2"),
        BASE_PATH.replace("<X>", "8"),
        BASE_PATH.replace("<X>", "353"),
        BASE_PATH.replace("<X>", "643"),
        BASE_PATH.replace("<X>", "299"),
        BASE_PATH.replace("<X>", "555"),
        BASE_PATH.replace("<X>", "450"),
        BASE_PATH.replace("<X>", "653"),
        BASE_PATH.replace("<X>", "63"),
        BASE_PATH.replace("<X>", "29"),
        BASE_PATH.replace("<X>", "55"),
        BASE_PATH.replace("<X>", "50"),
    ];

    const carouselRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

    useEffect(() => {
        const carousel: HTMLElement | null = carouselRef.current;
        let scrollDirection = 1;
        let currentScrollPosition = 0;

        if (carousel) {
            const maxScrollWidth = carousel.scrollWidth - carousel.clientWidth;

            const scrollStep = () => {
                if (currentScrollPosition >= maxScrollWidth) {
                    scrollDirection = -1;
                } else if (currentScrollPosition <= 0) {
                    scrollDirection = 1;
                }

                currentScrollPosition += scrollDirection * 2; // Adjust the speed by changing the multiplier
                carousel.scrollLeft = currentScrollPosition;
            };

            const scrollInterval = setInterval(scrollStep, 30); // Adjust the interval to change the speed

            return () => clearInterval(scrollInterval);
        }
    }, []);

    return (
        <div id="carousel" ref={carouselRef} className="carousel carousel-center rounded-box my-4 overflow-x-scroll">
            {images.map((url, idx) => (
                <div key={idx} className="carousel-item w-1/3 lg:w-1/5">
                    <img src={url} alt={`Base Nerd ${idx}`} />
                </div>
            ))}
        </div>
    );
};

export default BaseNerdzCarousel;