import Course from '../models/CourseModel.js';

export const addCourse = async (req, res) => {

    try{
        const { title, description, level, duration, image}  = req.body;

        const course=await Course.create({
            title,
            description,
            level,
            duration,
            image,
            createdBy: req.admin.id,
        });

        res.status(201).json({
            message: "Course added successfully",
            success: true,
            course,
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
export const getCourses = async (req, res) => {

    try{
        const course=(await Course.find()).sort({createdAt:-1});
        res.json(courses);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};