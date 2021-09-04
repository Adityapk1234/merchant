import {useState, Fragment} from 'react'
import { FiAlignCenter, FiAlignJustify, FiAlignRight, FiAlignLeft } from "react-icons/fi";
import { AiOutlineFontColors, AiOutlineVideoCamera, AiOutlineItalic, AiOutlineUnorderedList, AiOutlineBold } from "react-icons/ai";
import { MdFormatUnderlined } from "react-icons/md";
import { BsCardImage } from "react-icons/bs";
import axios from 'axios'

const AddTask =() =>{
	const [name,setName]=useState('')
	const [description,setDescription]=useState('');
	const [seoMetaDescription, setSeoMetaDescription]=useState('');
	const [seoMeta, setSeoMeta]=useState('');
	const [file, setFile] = useState('');
	const [productList, setProductList] = useState([]);
	const [newName, setNewName] = useState('');

	const onSubmit = (e)=>{
		e.preventDefault()
		if(!name){
			alert('Please enter data')
			return
		}
	
		axios.post('http://localhost:3001/insert', {
			name:name,
			description: description,
			seoMeta: seoMeta, 
			seoMetaDescription: seoMetaDescription
		}).then((response)=>{
			setProductList([
				...productList, {
				_id: response.data._id,
				productName:name,
				productDescription: description
				},
			])
		})
		setName('')
		setSeoMeta('')
		setSeoMetaDescription('')
		setDescription('')
	}

	const updateName=(id)=>{
		axios.put("http://localhost:3001/update", {
			backendnewName:newName,
			id: id
		}).then(() =>{
			setProductList(productList.map((product) => {
				return product._id === id ? { _id:id, productName:newName, productDescription:product.productDescription}: product;
				})
			)
		})
	}

	const getProducts =() =>{
		axios.get("http://localhost:3001/read")
			.then((response)=>{
				setProductList(response.data)
			}).catch(() => {
				console.log("Err")
			})
	};

	const deleteProduct =(id) =>{
		axios.delete(`http://localhost:3001/delete/${id}`)
		.then(() => {
			setProductList(productList.filter((product) => {
				return product._id !==id
			}))
		});
	}

	return(
		<Fragment>
			<div className='add-form'>
				<div className='form-control'>
					<label> Product title</label>
					<input
						type='text'
						placeholder='Enter the title here'
						value={name}
						onChange={(e)=>setName(e.target.value)}
					/>
				</div>
				<div className='form-control'>
					<label> Product description</label>
					<AiOutlineFontColors /> <AiOutlineBold />
					<AiOutlineItalic/> <MdFormatUnderlined/>
					<AiOutlineUnorderedList /> <FiAlignCenter />
					<FiAlignJustify /> <FiAlignLeft />
					<FiAlignRight /> <BsCardImage />
					<AiOutlineVideoCamera />
					<input
						className='form_input'
						type='text'
						placeholder='Product description'
						value={description}
						onChange={(e)=>setDescription(e.target.value)}
					/>
				</div>
				<div >
					<label> Upload Media<br /></label>
					<input 
						type='file'
						onChange={(e)=>setFile(e.target.files[0])}
					/>
				</div>
				<div className='form-control'>
					<label> Product Variants </label>
					<p style={{fontSize:11, fontWeight:'normal'}}> This product has multiple options, like different sizes or colors. </p>
					<input
						type='button'
						value={'Add Variant Option'} 	
						style={{backgroundColor:'red', width:160}}
						className='btn'
					/>
				</div>
				<div className='form-control'>
					<label> SEO Meta Details</label>
					<input 
						type='text'
						placeholder='SEO title'
						value={seoMeta}
						onChange={(e)=>setSeoMeta(e.target.value)}
					/>
					<input
						className='form_input'
						type='text'
						placeholder='SEO description'
						value={seoMetaDescription}
						onChange={(e)=>setSeoMetaDescription(e.target.value)}
					/>
				</div>
				<input 
						type='button' 
						onClick={onSubmit}
						value={`Save product`}
					 	className='btn btn-block'/>
			</div>
			<div>
				<input 
						onClick={getProducts}
						type='button' 
					   	value={`Show products`}
					   	className='btn btn-block'/>
				{productList.map((product) => {
					return ( 
						<div key={product._id} className="productlist" >
							<div >
								<h4>Name :{product.productName}</h4>
								<h4>Description :{product.productDescription}</h4>
							</div>
							<div>
								<input 
									style={{height:25}}
									type='text'
									onChange ={(e)=>setNewName(e.target.value)}
									placeholder='enter new name' />
								<input
									onClick={()=>{updateName(product._id)}}
									type='button'
									value={'Update'} 	
									style={{backgroundColor:'green', width:100}}
									className='btn'
								/>
								<input
									onClick={()=>{deleteProduct(product._id)}}
									type='button'
									value={'Delete'} 	
									style={{backgroundColor:'green', width:100}}
									className='btn'
								/>
							</div>
						</div>
					)
				})}
			</div>

		</Fragment>
		)
}

export default AddTask