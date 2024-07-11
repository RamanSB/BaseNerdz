const BaseNerdzCarousel = () => {
    const BASE_PATH = "https://ipfs.io/ipfs/QmZD2nh9f7mRrihdefwGGmBY7sFdWQ1vynuaY2AULaQXt4/<X>.png";
    const images: string[] = [BASE_PATH.replace("<X>", "94"), BASE_PATH.replace("<X>", "2"), BASE_PATH.replace("<X>", "8"), BASE_PATH.replace("<X>", "353"), BASE_PATH.replace("<X>", "643"), BASE_PATH.replace("<X>", "299"), BASE_PATH.replace("<X>", "555"), BASE_PATH.replace("<X>", "432")];
    return <div className="carousel carousel-center rounded-box my-4 ">
        {images.map((url, idx) => {
            return (<div key={idx} className="carousel-item w-1/3 lg:w-1/5">
                <img src={url} />
            </div>)
        })}
    </div>
};


export default BaseNerdzCarousel;