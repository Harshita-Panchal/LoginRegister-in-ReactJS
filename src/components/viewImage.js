function ViewImage(props){

    return(
        // this is for didplayed dog images
        <div className="dog-img">
            <img src={props.imageUrl} alt="Dog_Image"/>
        </div>
    )
}

export default ViewImage;