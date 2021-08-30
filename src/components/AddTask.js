import {useState} from 'react'
import { FiAlignCenter, FiAlignJustify, FiAlignRight, FiAlignLeft } from "react-icons/fi";
import { AiOutlineFontColors, AiOutlineVideoCamera, AiOutlineItalic, AiOutlineUnorderedList, AiOutlineBold } from "react-icons/ai";
import { MdFormatUnderlined } from "react-icons/md";
import { BsCardImage } from "react-icons/bs";

const AddTask =({onAdd}) =>{
	const [name,setName]=useState('')
	const [description,setDescription]=useState('');
	const [seoMetaDescription, setSeoMetaDescription]=useState('');
	const [seoMeta, setSeoMeta]=useState('');
	const onSubmit =(e)=>{
		e.preventDefault()
		if(!name){
			alert('Please enter data')
			return
		}
		
		onAdd({name, description, seoMeta, seoMetaDescription})

		setName('')
		setSeoMeta('')
		setSeoMetaDescription('')
		setDescription('')
	}
	return(
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
					type='text'
					placeholder='Add media files'
					// value={seoMeta}
					// onChange={(e)=>setSeoMeta(e.target.value)}
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
		)
}

export default AddTask