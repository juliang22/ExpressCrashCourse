const Express = require('express')
const router = Express.Router()
// Getting data from members file
const members = require('../../Members')
const uuid = require('uuid')

// Set up another endpoint that displays data
router.get('/', (req, res) => res.json(members))

// Get a single member, colon is a url paramter where the req object can grab whatever is in there
router.get('/:id', (req, res) => {
	const found = members.some(member => member.id == parseInt(req.params.id)) // Check if id exists
	if (found) res.json(members.filter(member => member.id === parseInt(req.params.id))) // return only that one id object by filtering through all members
	else res.status(400).json({ msg: `No member with id ${req.params.id} is found` }) //send a bad request http 
})

// Create Member
router.post('/', (req, res) => { //Can have different methods on the same route "/"
	const newMember = {
		id: uuid.v4(), //autogenerates id
		name: req.body.name,
		status: 'active'
	}
	if (!newMember.name) return res.status(400).json({ msg: `plz include name` })  //if name doesnt exist, send error status
	members.push(newMember) // If we were using mongoose, we would be doing this a bit different 
	//res.json(members)
	console.log(members);
	res.redirect('/')
})

//Update Member
router.put('/:id', (req, res) => {
	const found = members.some(member => member.id == parseInt(req.params.id)) // Check if id exists
	if (found) {
		const updMember = req.body
		members.forEach(mbr => {
			if (mbr.id === parseInt(req.params.id)) {
				mbr.name = updMember.name ? updMember.name : mbr.name
				res.json({ msg: 'Member updated', mbr })
			}
		})
	}
	else res.status(400).json({ msg: `No member with id ${req.params.id} is found` }) //send a bad request http 
})

//Deletes members
router.delete('/:id', (req, res) => {
	const found = members.some(member => member.id == parseInt(req.params.id)) // Check if id exists
	if (found) {
		res.json({
			msg: 'Member deleted',
			members: members.filter(member => member.id !== parseInt(req.params.id))
		})
	}
	else res.status(400).json({ msg: `No member with id ${req.params.id} is found` }) //send a bad request http 
})

module.exports = router