import { Dispatch, Fragment, MouseEventHandler, SetStateAction, useEffect, useState } from "react"

interface IProps {
    src: string,
    onImageClick: MouseEventHandler<HTMLImageElement>
}

const Image = ({ src, onImageClick }: IProps) => {

    const [state, setState]: [{ loaded: boolean }, Dispatch<SetStateAction<{}>>] = useState({
        loaded: false
    })

    const onImageLoad = () => {
        setState({
            loaded: true
        })
    }

    const onImageError = () => {

    }

    return (
        <>
            <Fragment>
                <div className="image-container">
                    <img
                        src={src}
                        onLoad={onImageLoad}
                        onError={onImageError}
                        onClick={onImageClick}
                        style={!state.loaded ? { visibility: 'hidden' } : { visibility: 'visible' }}
                    />
                    {!state.loaded && (
                        <div className="image-container-overlay">
                            <div className="loader">
                                <svg className="circular" viewBox="25 25 50 50">
                                    <circle
                                        className="path"
                                        cx="50"
                                        cy="50"
                                        r="20"
                                        fill="none"
                                        strokeWidth="2"
                                        strokeMiterlimit="10"
                                    />
                                </svg>
                            </div>
                        </div>
                    )}
                </div>
            </Fragment>
        </>
    )
}

export default Image