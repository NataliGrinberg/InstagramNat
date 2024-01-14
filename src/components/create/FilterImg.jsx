import { useSelector } from 'react-redux'
import { onToggleModalCreate } from '../../store/actions/create.actions';
import { Svgs } from '../../assets/Svgs'
import normal from '../../assets/images/Normal.jpg'
import { saveImageUrl } from '../../store/actions/image.actions';
import { SET_IMGS_URL } from '../../store/reducers/image.reducer';
import { uploadService } from '../../services/upload.service';
import { PostPreviewImg } from '../PostPreviewImg';

export function FilterImg() {
    const imageModalData = useSelector(storeState => storeState.imageModal.imgs)
   // const imageModalUrlData = useSelector(storeState => storeState.imageModal.imgsUrl)
    const files = Array.from(imageModalData.target.files);
    const filesUrl = files.map(file => URL.createObjectURL(file))

    const filter = { Aden: 'aden', Clarendon: 'clarendon', Crema: 'crema', Gingham: 'gingham', Juno: 'juno', Lark: 'lark', Ludwig: 'ludwig', Moon: 'moon', Original: 'original', Perpetua: 'perpetua', Reyes: 'reyes', Slumber: 'slumber' }


    async function uploadImageSelected() {

        //         //ADD filter
        //         let retuenImgData = ''
        //         let retuenImgDataUrl = []
        //         const files = Array.from(imageModalData.target.files);
        //         for (let i = 0; i < files.length; i++) {
        //             retuenImgData = await uploadService.uploadImg(files[i])
        //             console.log('retuenImgData', retuenImgData.secure_url)
        //             retuenImgDataUrl =  [...retuenImgDataUrl, retuenImgData.secure_url] 
        //         }


        //         saveImageUrl({ type: SET_IMGS_URL, imgsUrl: retuenImgDataUrl })
        onToggleModalCreate({ type: 'CreatePost' })

    }

 

    return (
        <section className="create-post-filter-img">

            <div className="upload-img-model-title" >
                <div className="filter-back-btn" onClick={() => { onToggleModalCreate({ type: 'UploadImg' }) }}>{Svgs.back}</div>

                <div className="upload-img-title" >
                    <div className="upload-img-title-div">Edit</div>
                </div>
                <button className="filter-next-btn" onClick={() => {
                    console.log("inser filter button")
                    uploadImageSelected()
                }}>next</button>

            </div>


            <div className="create-post-filter-img-continar">
                <div className="create-post-filter-img-2">
                    <PostPreviewImg imgUrl={[]} />
                </div>
                <div>


                    <div className="upload-img-filter">
                        <div className="upload-img-filter-title">


                            <div className='list-of-filter'>
                                {Object.entries(filter).map(([k, v]) => (
                                    <div className='filter-flex'>
                                        <div className='filter-img'>
                                            <figure className={v} >
                                                <img src={normal} />
                                            </figure>
                                        </div>
                                        <div className='filter-name'>{k}</div>
                                    </div>
                                ))}
                            </div>

                            {/* <ul >
                        {filesUrl.map(url => (
                            <Filters imageSelected={url} key={url} />
                        ))}
                    </ul> */}
                        </div>
                    </div>

                </div>
            </div>
        </section >
    )
}




function Filters({ key, imageSelected }) {
    const filter = { Aden: 'aden', Clarendon: 'clarendon', Crema: 'crema', Gingham: 'gingham', Juno: 'juno', Lark: 'lark', Ludwig: 'ludwig', Moon: 'moon', Original: 'original', Perpetua: 'perpetua', Reyes: 'reyes', Slumber: 'slumber' }

    return (
        <div className="create-post-filter">
            {

                //  Object.entries(map).map(([k,v]) => `${k}_${v}`);

                <div className='list-of-filter'>
                    {Object.entries(filter).map(([k, v]) => (
                        <figure className={v}>
                            <img src={normal} />
                        </figure>
                    ))}
                </div>


                // <img src={normal} alt="Pineapple" />
                // <figure className="aden">
                //     <img src={normal} />
                // </figure>

            }

            {/* <img src={imageSelected} alt="Pineapple" />
            <img className="blur" src={imageSelected} alt="Pineapple" />
            <img className="brightness" src={imageSelected} alt="Pineapple" />
            <img className="contrast" src={imageSelected} alt="Pineapple" />
            <img className="grayscale" src={imageSelected} alt="Pineapple" />
            <img className="huerotate" src={imageSelected} alt="Pineapple" />
            <img className="invert" src={imageSelected} alt="Pineapple" />
            <img className="opacity" src={imageSelected} alt="Pineapple" />
            <img className="saturate" src={imageSelected} alt="Pineapple" />
            <img className="sepia" src={imageSelected} alt="Pineapple" />
            <img className="shadow" src={imageSelected} alt="Pineapple" /> */}
        </div>

    )

}

