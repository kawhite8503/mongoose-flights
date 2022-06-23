import { Router } from 'express'
import * as flightsCtrl from "../controllers/flights.js"

const router = Router()

// GET localhost:3000/flights
router.get('/', flightsCtrl.index)


// GET localhost:3000/flights/new
router.get('/new', flightsCtrl.new)

router.get('/:id', flightsCtrl.show)

router.get('/:id/edit', flightsCtrl.edit)

//POST localhost:3000/flights
router.post('/', flightsCtrl.create)

router.post('/:id/tickets', flightsCtrl.createTicket)


router.delete("/:id", flightsCtrl.delete)

router.delete('/:flightId/tickets/:ticketId', flightsCtrl.deleteTicket)

router.put("/:id", flightsCtrl.update)

export {
  router
}
