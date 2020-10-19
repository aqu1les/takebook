export default {
	translation: {
		global: {
			welcome: 'Welcome to Takebook',
			createBook: 'Register Book',
			chats: 'Chats',
			bookmarks: 'Bookmarks',
			myads: 'My books',
		},

		new: 'New',
		semiNew: 'Semi New',
		used: 'Second hand',

		success: 'Success',
		back: 'Go back',

		routes: {
			home: 'Home',
			myAds: 'My Books',
			chats: 'Chats',
			bookmarks: 'Bookmarks',
			logout: 'Log out',
		},

		error: {
			noConnection: "We're unable to contact the server",
			invalidEmail: 'Invalid email',
			wrongPassword: 'Wrong password',
			somethingWentWrong: 'Something went wrong, try again later',
		},

		login: {
			email: 'E-mail',
			password: 'Password',
			remindMe: 'Stay connected',
			forgot: 'Forgot your password?',
			login: 'Login',
			register: 'Register',
		},

		signUp: {
			name: 'Your full name',
			email: 'Your best e-mail',
			password: 'Type your password',
			confirmPassword: 'Confirm your password',
			register: 'Register',

			success: {
				title: 'Registered successfully!',
				content: 'Feel free to publish or purchase new books!',
				button: 'Begin',
			},

			error: {
				title: 'Something wrong happened :(',
				content: 'Try again later!',
				button: 'Ok',
			},

			addressFormHeader: 'Fill in the fields to register your address',
		},

		advertList: {
			recent: 'Most Recent',
			noBooks: 'No books registered!',
			advert: {
				locale: 'Locale',
				author: 'Author',
			},
			onRemoveSuccessText: 'The book was successfully removed!',
		},

		advertDetails: {
			tabs: {
				description: 'Description',
				localization: 'Localization',
				contact: 'Contact',
			},
			profile: {
				button: 'See Profile',
				talk: 'Get in touch',
			},
		},

		categories: {
			highlights: 'Highlights',
			horror: 'Horror',
			comedy: 'Comedy',
			mistery: 'Mistery',
			adventure: 'Adventure',
		},

		onboardModals: {
			first: {
				header: 'Ready to publish your book?',
				content: "It's very simple, there are just 2 steps!",
				button: "Let's go",
			},
			second: {
				header: 'Take pictures!',
				textplanation:
					'You will need a photo of the cover and back cover. Use your best techniques as a photographer to make your ad more attractive: D',
			},
		},

		newBook: {
			successFeedbackTitle: 'Success!',
			successFeedbackText: 'Your book was registered successfully!',
			successFeedbackButton: 'Go back',
			pageOne: {
				title: 'Choose your pictures',
				help1: 'Click on the fields to add your pictures',
				help2: '* Drag to the left to add more pictures to your ad',
				help3: '** Add at least 2 images (Front & Back)!',
			},
			pageTwo: {
				help1: 'Tell me more about your book',
				remember: 'Remember',
				help2:
					'A well-described book is more easily found in a search.',
				title: 'What is the title of your book?',
				author: 'What about the author?',
				bookStatus: "Set your book's condition",
				howMuch: 'How much?',
			},
			pageThree: {
				categories: 'Select the categories your book fits',
				description: 'Describe your book, the more details the better!',
				button: 'Publish',
			},
		},

		chats: {
			type: 'Type a message',
			noChats_1: 'You currently have no conversations!',
			noChats_2:
				'Contact an advertiser to negotiate the purchase of a book!',
			loadChats: 'Load chats',
			firstMessage: "Hello :) I'm interested on your book!",
		},

		forgotPassword: {
			step_1: {
				title: 'Recover password',
				helpText:
					'Type your registered e-mail so we can send you the PIN to recover your password',
				input: 'Type your e-mail',
				button: 'Send',
				successFeedback: 'E-mail sent!',
				errorFeedback: 'The e-mail is not registered in our database',
			},
			step_2: {
				title: 'Type in the PIN',
				helpText:
					'We sent a 6 digit PIN to your e-mail, type it so we can continue the password recovery process',
				button: 'Continue',
				successFeedback: 'PIN validated',
				errorFeedback: 'Invalid PIN',
			},
			step_3: {
				title: 'Update password',
				helpText:
					'Now that we finished the previous steps, type in your new password! =D',
				firstInput: 'Type your new passwrod',
				secondInput: 'Confirm your new password',
				button: 'Update',
				successFeedback: 'Password changed successfully!',
			},
		},

		favorites: {
			text1: "You haven't liked any books yet",
			text2:
				'Access the main menu and see the books available for purchase',
			button: 'Reload my favorites list',
		},

		addressForm: {
			zipcode: 'Zipcode',
			neighborhood: 'Neighborhood',
			city: 'City',
			state: 'State',
			street: 'Street',
			secondaryButton: 'Cancel',
			actionButton: 'Apply',
		},
	},
};
