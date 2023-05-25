import { useNavigate } from 'react-router-dom';
import CSS from './BoardPostRegistration.module.css';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callBoardPostRegistAPI } from '../../apis/ProductAPICalls';

function BoardPostRegistration() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { regist } = useSelector(state => state.boardPostReducer);
    

    /* 상품 등록 후 regist 값이 확인 되면 상품 목록으로 이동 */
    useEffect(
        () => {
            if(regist?.status === 200) {
                alert('게시글 등록이 완료 되었습니다.');
                navigate('/boardPosts', { replace : true });
            }
        },
        [regist]
    );

    

//     /* 입력 양식의 값이 변경 될 때 */
//     const onChangeHandler = (e) => {
//         setForm({
//             ...form,
//             [e.target.name] : e.target.value
//         });
//     }

//     /* 상품 등록 버튼 클릭 이벤트 */
//     const onClickProductRegistrationHandler = () => {
//         /* 서버로 전달할 FormData 형태의 객체 설정 */
//         const formData = new FormData();
//         formData.append("productName", form.productName);
//         formData.append("productPrice", form.productPrice);
//         formData.append("productOrderable", form.productOrderable);
//         formData.append("productStock", form.productStock);
//         formData.append("productDescription", form.productDescription);
//         formData.append("category.categoryCode", form.categoryCode);

//         if(image) {
//             formData.append("productImage", image);
//         }

//         dispatch(callProductRegistAPI(formData));
//     }

//     return (
//         <div>
//             <div className={ ProductRegistrationCSS.productButtonDiv }>
//                 <button        
//                     onClick={ () => navigate(-1) }            
//                 >
//                     돌아가기
//                 </button>
//                 <button 
//                     onClick={ onClickProductRegistrationHandler }      
//                 >
//                     상품 등록
//                 </button>
//             </div>        
//             <div className={ ProductRegistrationCSS.productSection }>
//                 <div className={ ProductRegistrationCSS.productInfoDiv }>
//                     <div className={ ProductRegistrationCSS.productImageDiv }>
//                         { imageUrl && 
//                             <img 
//                                 className={ ProductRegistrationCSS.productImage } 
//                                 alt="preview"
//                                 src={ imageUrl }
//                             />
//                         }
//                         <input                
//                             style={ { display: 'none' }}
//                             type="file"
//                             name='productImage' 
//                             accept='image/jpg,image/png,image/jpeg,image/gif'
//                             ref={ imageInput }
//                             onChange={ onChangeImageUpload }
//                         />
//                         <button 
//                             className={ ProductRegistrationCSS.productImageButton }
//                             onClick={ onClickImageUpload }
//                         >
//                             이미지 업로드
//                             </button>
//                     </div>
//                 </div>
//                 <div className={ ProductRegistrationCSS.productInfoDiv }>
//                     <table>
//                         <tbody>
//                             <tr>
//                                 <td><label>상품이름</label></td>
//                                 <td>
//                                     <input 
//                                         name='productName'
//                                         placeholder='상품 이름'
//                                         className={ ProductRegistrationCSS.productInfoInput }
//                                         onChange={ onChangeHandler }
//                                     />
//                                 </td>
//                             </tr>    
//                             <tr>
//                                 <td><label>상품가격</label></td>
//                                 <td>
//                                     <input 
//                                         name='productPrice'
//                                         placeholder='상품 가격'
//                                         type='number'
//                                         className={ ProductRegistrationCSS.productInfoInput }
//                                         onChange={ onChangeHandler }
//                                     />
//                                 </td>
//                             </tr>    
//                             <tr>
//                                 <td><label>활성화 여부</label></td>
//                                 <td>
//                                     <label><input type="radio" onChange={ onChangeHandler } name="productOrderable" value="Y"/> Y</label> &nbsp;
//                                     <label><input type="radio" onChange={ onChangeHandler } name="productOrderable" value="N"/> N</label>
//                                 </td>
//                             </tr>    
//                             <tr>
//                                 <td><label>상품 종류</label></td>
//                                 <td>
//                                     <label><input type="radio" onChange={ onChangeHandler } name="categoryCode" value="1"/> 식사</label> &nbsp;
//                                     <label><input type="radio" onChange={ onChangeHandler } name="categoryCode" value="2"/> 디저트</label> &nbsp;
//                                     <label><input type="radio" onChange={ onChangeHandler } name="categoryCode" value="3"/> 음료</label>
//                                 </td>
//                             </tr> 
//                             <tr>
//                                 <td><label>상품 재고</label></td>
//                                 <td>
//                                 <input 
//                                         placeholder='상품 재고'
//                                         type='number'
//                                         name='productStock'
//                                         className={ ProductRegistrationCSS.productInfoInput }
//                                         onChange={ onChangeHandler }
//                                     />
//                                 </td>
//                             </tr> 
//                             <tr>
//                                 <td><label>상품 설명</label></td>
//                                 <td>
//                                     <textarea 
//                                         className={ ProductRegistrationCSS.textAreaStyle }
//                                         name='productDescription'
//                                         onChange={ onChangeHandler }
//                                     ></textarea>
//                                 </td>
//                             </tr> 
//                         </tbody>                        
//                     </table>
//                 </div>
//             </div>
//         </div> 
//     );
// }

// export default BoardPostRegistration;