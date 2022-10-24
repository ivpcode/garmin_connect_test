const { GarminConnect } = require('garmin-connect');
const express = require('express')

const app = express()
app.use(express.static(__dirname + '/public'))
app.use(express.json()) // for parsing application/x-www-form-urlencoded

app.post('/api/activities/get', async (req, res) => {

	// Create a new Garmin Connect Client
	const GCClient = new GarminConnect();

	// Uses credentials from garmin.config.json or uses supplied params
	await GCClient.login(req.body.login, req.body.password);

	let data = []
	let userInfo = await GCClient.getUserInfo();

	let activities = await GCClient.getActivities();
	activities.forEach((a)=>{
		data.push({
			activityId: a.activityId,
			activityName: a.activityName,
			startTimeGMT: a.startTimeGMT,
			duration: a.duration,
			distance: a.distance
		})
	})
	res.json(data)
})

app.listen(5000)
