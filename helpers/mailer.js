const SibApiV3Sdk = require('sib-api-v3-sdk')
const sendResetEmail = (email, token) => {
	//Create a new instance and api key
	const client = SibApiV3Sdk.ApiClient.instance
	const apiKey = client.authentications['api-key']
	apiKey.apiKey = process.env.SENDINBLUE_API

	//create new transaction email instance
	const mailOptions = new SibApiV3Sdk.TransactionalEmailsApi()

	//Specify the sender
	const sender = {
		email: 'mernfsd@gmail.com',
		name: 'story.io',
	}
	//Specify the recipients
	const recipients = [
		{
			email: email,
		},
	]

	//Send the email
	mailOptions
		.sendTransacEmail({
			sender,
			to: recipients,
			subject: 'story.io password reset code',
			htmlContent: `<p>Your password reset code is: <mark>${token}</mark></p>`,
		})
		.then(console.log)
		.catch(console.log)
}

module.exports = sendResetEmail
