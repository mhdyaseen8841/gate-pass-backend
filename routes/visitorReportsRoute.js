import express from 'express'
import { addPerson, addPurpose, createReport, getCompanyData, getCurrentVisitor, getPersonData, getPurpose, getVisitorDashboard, getVisitorReport, visitorCheckout,  } from '../controllers/visitorReportsController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router()

router.route('/visitEntry').post(protect,createReport)
router.route('/visitEntry').post(createReport)
router.route('/getVisitorDashboard').get(getVisitorDashboard)
router.route('/getCurrentVisitor').get(getCurrentVisitor)
router.route('/getVisitorReport').get(getVisitorReport)
router.route('/visitorCheckout').post(protect,visitorCheckout)
router.route('/visitorCheckout').post(visitorCheckout)
router.route('/getPurpose').get(getPurpose)
router.route('/addPurpose').post(protect,addPurpose)
router.route('/addPerson').post(protect,addPerson)
router.route('/getPerson').get(getPersonData)
router.route('/getCompany').get(getCompanyData)
export default router