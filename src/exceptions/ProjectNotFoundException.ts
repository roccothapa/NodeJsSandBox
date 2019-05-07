import HttpException from "./HttpException"

class ProjectNotFoundException extends HttpException {
    
    /**
     * @param  {string} id
     */
    constructor (id: string)
    {
        super(404, `Project with id ${id} not found`)
    }
}

export default ProjectNotFoundException