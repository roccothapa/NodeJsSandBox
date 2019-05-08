import { Router, Request, Response } from "express"
import userRoutes from "../components/user/routes/api.route"
import ProjectTypeRoutes from "../components/projectTypes/routes/api.route"
import ProjectRoutes from "../components/project/routes/api.route"

class BaseRoutes {

    public _route: any

    constructor () 
    {
        this._route = Router()
        this.initializeBaseRoutes()
    }

    private initializeBaseRoutes() 
    {
        this.route.get("/", (req: Request, res: Response) => {
            res.send("welcome to API")
        })

        this._route.use("/users", new userRoutes().route)
        this._route.use("/project-types", new ProjectTypeRoutes().route)
        this._route.use("/projects", new ProjectRoutes().route)
    }

    get route()
    {
        return this._route;
    }
}

export default BaseRoutes