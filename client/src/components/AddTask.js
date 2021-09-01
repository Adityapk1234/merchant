import {useState, Fragment} from 'react'
import { FiAlignCenter, FiAlignJustify, FiAlignRight, FiAlignLeft } from "react-icons/fi";
import { AiOutlineFontColors, AiOutlineVideoCamera, AiOutlineItalic, AiOutlineUnorderedList, AiOutlineBold } from "react-icons/ai";
import { MdFormatUnderlined } from "react-icons/md";
import { BsCardImage } from "react-icons/bs";
import axios from 'axios'

const AddTask =({onAdd}) =>{
	const [name,setName]=useState('')
	const [description,setDescription]=useState('');
	const [seoMetaDescription, setSeoMetaDescription]=useState('');
	const [seoMeta, setSeoMeta]=useState('');
	const [file, setFile] = useState('');

	const onSubmit =async (e)=>{
		e.preventDefault()
		if(!name){
			alert('Please enter data')
			return
		}

		onAdd({name, description, seoMeta, seoMetaDescription})
	
		axios.post('http://localhost:3001/create', {
			name:name,
			description: description,
			seoMeta: seoMeta, 
			seoMetaDescription: seoMetaDescription
		}).then(()=>{
			console.log("Success")
		})
		// const data=new FormData();
		// data.append("file",file);
		// axios.post("http://localhost:3000/upload",data)
		// 	.then(res => console.log(res))
		// 	.catch(err => console.log(err));

		setName('')
		setSeoMeta('')
		setSeoMetaDescription('')
		setDescription('')
	}

	return(
		<Fragment>
			<form className='add-form' onSubmit={onSubmit}>
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
				<div className='form-control'>
					<label> Upload Media</label>
					<input 
						type='file'
						accept='.png'
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
				<input type='submit' value={`Save product`}
					   className='btn btn-block'/>
			</form>
		</Fragment>
		)
}

export default AddTask