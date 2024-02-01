// export function CreateDynamicModalPresentation() {
//   const createModalData = useSelector(
//     (storeState) => storeState.createModule.createModalData
//   )

//   if (!createModalData) return <></>
//   return (
//     <div>
//       <div className="create-dynamic-modal-opacity">
//         <div
//           className="create-dynamic-modal-button"
//           onClick={() => {
//             saveImageUrl({ type: SET_IMGS_URL, imgsUrl: null })
//             saveImage({ type: SET_IMGS, imgs: null })
//             onCloseModalCreate()
//           }}>
//           <div className="create-dynamic-modal-button-div">
//             <div className="svgg">{Svgs.close}</div>
//           </div>
//         </div>

//         <div className="create-dynamic-modal">
//           <div className="create-dynamic-modal-div">
//             <DynamicCmp type={createModalData.type} />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// function DynamicCmp(props) {
//   const cmpMap = {
//     UploadImg: <UploadImg {...props} />,
//     FilterImg: <FilterImg {...props} />,
//     CreatePost: <CreatePost {...props} />,
//   }

//   const CmpToRender = cmpMap[props.type]
//   return CmpToRender
// }
