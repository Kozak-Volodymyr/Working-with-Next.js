//Get
import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt'
export const GET=async(request,{params})=>{
	try {
		await connectToDB()
		const prompt=await Prompt.findById(params.id).populate('creator')
		if(!prompt)
		return new Response('Propt not found',{
			status:404})

		return new Response(JSON.stringify(prompt),{
			status:200
		})
	} catch (error) {
		return new Response('Error when gets posts',{
			status:500})
	}
}
//Patch
export const PATCH=async(request,{params})=>{
	const {prompt,tag}=await request.json()
	try{
	await connectToDB()
	const existingPrompt=await Prompt.findById(params.id);
	console.log(existingPrompt)
	if(!existingPrompt) 
	return new Response('Propt not found',{
			status:404})
	existingPrompt.prompt=prompt
	existingPrompt.tag=tag
	await existingPrompt.save()
	return new Response('Updated prompt',{
			status:200
		})}

	catch (error) {
		return new Response('Error when patch post',{
			status:500})
	}
}
//DELETE
export const DELETE=async(request,{params})=>{
	try {
		await connectToDB();
		await Prompt.findByIdAndRemove(params.id)
		return new Response('Deleted',{
			status:200
		})
	} catch (error) {
		return new Response('Error when delete post',{
			status:500})
	}
}