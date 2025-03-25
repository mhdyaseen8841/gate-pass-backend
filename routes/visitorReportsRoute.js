import express from 'express'

import { addPerson, addPurpose, createReport, getCompanyData, getCurrentVisitor, getPersonData, getPurpose, getVisitorDashboard, getVisitorReport, visitorCheckout,  } from '../controllers/visitorReportsController.js';

const router = express.Router()

router.route('/visitEntry').post(createReport)
router.route('/getVisitorDashboard').get(getVisitorDashboard)
router.route('/getCurrentVisitor').get(getCurrentVisitor)
router.route('/getVisitorReport').get(getVisitorReport)
router.route('/visitorCheckout').post(visitorCheckout)
router.route('/getPurpose').get(getPurpose)
router.route('/addPurpose').post(addPurpose)
router.route('/addPerson').post(addPerson)
router.route('/getPerson').get(getPersonData)
router.route('/getCompany').get(getCompanyData)
export default router