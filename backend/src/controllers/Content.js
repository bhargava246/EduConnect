import { content } from "../models/user";

const createContent = async (req,res)=>{
    try {
        const {tittle,vedio,notes,duration,order} = req.body;
        if(!tittle|| !order){return res.status(402).json({message: 'order or tittle missing'})}
        const exist = await content.findOneA({order: order});
        if(exist){return res.status(401).json({message: 'order no already exist'})}
        const newContentModel = new content({tittle,vedio,notes,duration,order});
        await newContentModel.save();
        return res.status(200).send({message: 'content saved successfully',
            content: newContentModel}
        );
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'internal error'});
    }
}

const deleteContent = async (req,res)=>{
 try {
    const {order} = req.url;
    const deleted = await content.findOneAndDelete({order:order});
    if(!deleted){
        return res.status(404).json({message: 'Course was not able to find the course'});
    }
    return res.status(200).json({message: 'Course was deleted successfully'});
 } catch (error) {
    console.error(error);
    return res.status(500).json({message: 'Internal Server error'})    
 }
}

const updateContent = async (req,res)=>{
    try {
        const {order} = req.url;
        const {tittle,video,notes,duration} = req.body;
        const updated = await content.findOneAndUpdate({{order:order},{tittle,vedio,notes,duration})
        if(!update){
            return res.status(404).json({message: 'was not able to find the course'});
        }
        return res.status(200).json({message: 'Course was updated successfully'});

    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Internal Server error'})    
 }
    }

    const fetchContent = async (req,res)=>{
        try {
            const contentFetch = await content.find({})
            return res.status(200).send(contentFetch);
        } catch (error) {
            return res.status(500).send('Internal Error');
        };
        };
        
        const contentById = async (req,res)=>{
            
            try {
                const {order} = req.url;
                let contentId = await courseModel.findOne({order:order})
                if(!contentId){ return res.status(404).send('Course does not exist');}
                return res.status(200).json(contentId);
            } catch (error) {
                console.error(error);
                
                return res.status(500).send('Internal Error');
            }
        }
        export {contentById,contentFetch,deleteContent,updateContent}