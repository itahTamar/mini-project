import express from "express"
import createSchemaAndTables from "./creationCont"

const router = express.Router()

router.get("", createSchemaAndTables)

export default router;