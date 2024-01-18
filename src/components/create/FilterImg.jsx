import { useSelector } from 'react-redux'
import { onToggleModalCreate } from '../../store/actions/create.actions';
import { Svgs } from '../../assets/Svgs'
import normal from '../../assets/images/Normal.jpg'
import { saveImageUrl } from '../../store/actions/image.actions';
import { SET_IMGS_URL } from '../../store/reducers/image.reducer';
import { useEffect, useRef, useState } from 'react';
import { toPng } from 'html-to-image';

export function FilterImg() {
    const imageModalData = useSelector(storeState => storeState.imageModal.imgs)
    const imageModalUrlData = useSelector(storeState => storeState.imageModal.imgsUrl)
    const files = Array.from(imageModalData.target.files);
    const elementRef = useRef(null);
    // const filter = { Aden: 'filter-aden', Clarendon: 'filter-clarendon', Crema: 'filter-crema', Gingham: 'filter-gingham', Juno: 'juno', 'filter-juno', Lark: 'filter-lark', Ludwig: 'filter-ludwig', Moon: 'filter-moon', Original: 'original', Perpetua: 'filter-perpetua', Reyes: 'filter-reyes', Slumber: 'filter-slumber' }
    const filter = { Aden: 'aden', Clarendon: 'clarendon', Crema: 'filter-crema', Gingham: 'gingham', Juno: 'filter-juno', Lark: 'lark', Ludwig: 'filter-ludwig', Moon: 'moon', Original: 'original', Perpetua: 'perpetua', Reyes: 'reyes', Slumber: 'slumber' }

    const [imgCount, setImgCount] = useState(0)
    const [isloading, setIsloading] = useState(false)
    console.log('imageModalData: ', files)
    const [filesMap, setFilesMap] = useState(imageModalUrlData ? imageModalUrlData : files.map((file) => {
        { return { 'file': file, 'type': (file.type.includes('video') ? 'video' : 'image'), 'url': URL.createObjectURL(file), 'filter': '', displayFilter: false } }
    }))


    async function uploadImageSelected() {
        
        if (filesMap[imgCount].type === 'video')
            onToggleModalCreate({ type: 'CreatePost' })
        else
            htmlToImageConvertMove()
    }

    useEffect(() => {
    }, [filesMap])


    const htmlToImageConvert = (count) => {
        setIsloading(true)
        toPng(elementRef.current, { cacheBust: false })
            .then((dataUrl) => {
                filesMap[count].url = dataUrl
                let metadata = {
                    type: filesMap[count].file.type
                };
                let newFile = new File([dataUrl], filesMap[count].file.name, metadata)
                filesMap[count].file = newFile
                setFilesMap([...filesMap])
                setIsloading(false)
                saveImageUrl({ type: SET_IMGS_URL, imgsUrl: filesMap })


            })
            .catch((err) => {
                console.log(err);
            });
    };

    const htmlToImageConvertMove = () => {
        setIsloading(true)
        toPng(elementRef.current, { cacheBust: false })
            .then((dataUrl) => {

                filesMap[imgCount].url = dataUrl
                let metadata = {
                    type: filesMap[imgCount].file.type
                };
                let newFile = new File([dataUrl], filesMap[imgCount].file.name, metadata)
                filesMap[imgCount].file = newFile
                filesMap[imgCount].displayFilter = false;

                setFilesMap([...filesMap])
                saveImageUrl({ type: SET_IMGS_URL, imgsUrl: filesMap })
                setIsloading(false)
                onToggleModalCreate({ type: 'CreatePost' })

            })
            .catch((err) => {
                console.log(err);
            });
    };

    function addFilterToImage(filter) {

        if (filesMap[imgCount].filter !== '' && filesMap[imgCount].file.name === files[imgCount].name) {
            filesMap[imgCount].url = URL.createObjectURL(files[imgCount])
        }

        filesMap[imgCount].filter = filter.v
        filesMap[imgCount].displayFilter = true;
        setFilesMap([...filesMap])
    }

    return (
        <section className="create-post-filter-img">

            {isloading && <div className='loader'></div>}

            <div className="upload-img-model-title-filter" >

                <div className="filter-back-btn" onClick={() => { 
                     saveImageUrl({ type: SET_IMGS_URL, imgsUrl: null })
                    onToggleModalCreate({ type: 'UploadImg' }) }}>
                    <div className="filter-back-btn-svg">{Svgs.back}</div>
                </div>

                <div className="upload-img-title" >
                    <div className="upload-img-title-div">Edit</div>
                </div>

                <div className="upload-img-title-btn" >
                    <div className="filter-next-btn" onClick={() => {
                        uploadImageSelected()
                    }}>Next</div>
                </div>
            </div>


            <div className="create-post-filter-img-continar">

                <div className="create-post-filter-img-data">
                    {/* <div className="post-filter-preview"> */}
                    <div>
                        {(imgCount > 0) &&
                            <button onClick={() => {
                                if (filesMap[imgCount].filter !== '')
                                    htmlToImageConvert(imgCount)
                                setImgCount(imgCount - 1)
                            }}
                                aria-label="Go Back" className=" _afxv _al46 _al47" >
                                <div className=" _9zm0"></div>
                            </button>
                        }
                    </div>

                    <div>
                        {
                            
                            filesMap.length > 0 && filesMap[imgCount].url !== null
                            && ((filesMap[imgCount].type === 'video'
                                && <video controls className='post-img-style'>
                                    <source src={filesMap[imgCount].url} type="video/mp4" autoPlay={true} />
                                </video>)
                                || (<img ref={elementRef} className={`post-img-style ${filesMap[imgCount].displayFilter ? filesMap[imgCount].filter : ``}`} src={filesMap[imgCount].url} />))

                        }
                    </div>

                    <div>
                        
                        {((filesMap.length - 1) > imgCount) &&
                            <button onClick={() => {
                                if (filesMap[imgCount].filter !== '')
                                    htmlToImageConvert(imgCount)
                                setImgCount(imgCount + 1)
                            }} aria-label="Next" className=" _afxw _al46 _al47">
                                <div className="_9zm2"></div>
                            </button>
                        }
                    </div>
                </div>



                {/* </div> */}



                <div className="upload-img-filter">
                    <div className="upload-img-filter-title">
                        <div className="upload-img-filter-title-div">Filters</div>
                    </div>

                    <div className="upload-img-filter-list">
                        <div className='list-of-filter'>
                            {
                                filesMap[imgCount].type === 'image' &&
                                Object.entries(filter).map(([k, v]) => (
                                    <div className='filter-flex'>
                                        <div onClick={() => { addFilterToImage({ v }) }} className={`filter-img ${v}`}>
                                            <div className={`filter-img-div  ${filesMap[imgCount].filter === v ? 'filter-selected' : ''}`}><img src={normal} /></div>

                                        </div>
                                        <div className={`filter-name  ${filesMap[imgCount].filter === v ? 'filter-selected-name' : ''}`}>{k}</div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}




