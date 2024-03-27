import Project from '../../models/project/project-model';

export const addCloneProject = async (projectId) => {
    try { 
        const projectToClone = await Project.findById(projectId);
        if (!projectToClone) {
            throw new Error('Project not found');
        }
        const clonedProject = await ClonedProject.create({
            title: projectToClone.title,
            description: projectToClone.description,
        });
        console.log(clonedProject, "Cloned project created successfully");
        return { response: clonedProject, err: null };
    } catch (err) {
        console.error('Error cloning project:', err);
        return { response: null, err };
    }
};


// export const addCloneProject = async (projectId) => {
//     try { 
//         const projectToClone = await Project.findById(projectId);
//         if (!projectToClone) {
//             throw new Error('Project not found');
//         }
//         const clonedProject = await Project.create({
//             title: projectToClone.title,
//             description: projectToClone.description,
//         });
//         console.log(clonedProject,".......")
//         return { response: clonedProject, err: null };
//     } catch (err) {
//         console.error('Error cloning project:', err);
//         return { response: null, err };
//     }
// }; 

// export const addCloneProject = async (projectId) => {
//     try {
//         // Find the project by its ID
//         const projectToClone = await Project.findById(projectId);

//         if (!projectToClone) {
//             throw new Error('Project not found');
//         }

//         // Clone the project (assuming you have a method to clone projects)
//         const clonedProject = await cloneProject(projectToClone);

//         // Return the cloned project
//         return { response: clonedProject, err: null };
//     } catch (err) {
//         console.error('Error cloning project:', err);
//         return { response: null, err };
//     }
// };
