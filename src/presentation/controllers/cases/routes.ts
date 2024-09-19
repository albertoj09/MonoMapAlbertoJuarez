import { Router } from "express";
import { CaseHandler } from "./controller";

export class CasesRoutes{
    static get routes(){
        const router = Router();
        const controller = new CaseHandler();
        router.get("/",controller.fetchAllCases);
        router.post("/",controller.registerNewCase);
        router.get("/last-week",controller.retrieveRecentCases);
        router.get("/:id",controller.fetchCaseDetails);
        router.put("/:id",controller.modifyCaseInfo);
        router.delete("/:id",controller.removeCaseRecord);
        return router
    }
}