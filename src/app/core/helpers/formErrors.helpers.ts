export const authFieldsErrors = {
	email: [
		{ type: 'required', message: 'Enter email address' },
		{ type: 'pattern', message: 'Please enter a valid email address' }
	],
	password: [
		{ type: 'required', message: 'Enter password' },
		{ type: 'minlength', message: 'Password cannot be less than 6 characters' }
	],
	confirmPassword: [
		{ type: 'misMatch', message: 'Password & confirm password didn\'t match' }
	]
};


export const customerFormErrors = {
	firstName: [
		{ type: 'required', message: 'Enter first name' }
	],
	lastName: [
		{ type: 'required', message: 'Enter last name' }
	],
	email: [
		{ type: 'required', message: 'Enter email address' },
		{ type: 'pattern', message: 'Please enter a valid email address' }
	],
	mobileNumber: [
		{ type: 'required', message: 'Enter mobile number' },
		{ type: 'pattern', message: 'Please enter a valid mobile number' },
		{ type: 'maxlength', message: 'Enter 10 digit number' }
	],
	profilePicture: [
		{ type: 'required', message: 'Please upload a profile picture' },
	],
};

export const categoryFormErrors = {
	name: [
		{ type: 'required', message: 'Enter category name' }
	],
	businessTypeId: [
		{ type: 'required', message: 'Please select business type' }
	],
	image: [
		{ type: 'required', message: 'Please upload a image' },
	],
	amount: [
		{ type: 'required', message: 'Please enter subscription amount' },
	],
};

export const seasonalOfferFormErrors = {
	heading: [
		{ type: 'required', message: 'Enter heading' }
	],
	startDate: [
		{ type: 'required', message: 'Enter start date' },
	],
	endDate: [
		{ type: 'required', message: 'Enter end date' },
	],
	title: [
		{ type: 'required', message: 'Enter title' },
	],
	image: [
		{ type: 'required', message: 'Please upload a image' },
	],

};

export const subCategoryFormErrors = {
	businessTypeId: [
		{ type: 'required', message: 'Please select business type' }
	],
	parentId: [
		{ type: 'required', message: 'Please select category' }
	],
	name: [
		{ type: 'required', message: 'Enter sub category name' }
	],
	subCategoryType: [
		{ type: 'required', message: 'Enter sub category type' }
	],
	description: [
		{ type: 'required', message: "Enter  description" }
	],
	image: [
		{ type: 'required', message: 'Please upload a image' },
	],
};

export const advertiseFormErrors = {
	title: [
		{ type: 'required', message: 'Enter title' }
	],
	description: [
		{ type: 'required', message: "Enter  description" }
	],
	startDate: [
		{ type: 'required', message: 'Enter start date' },
	],
	endDate: [
		{ type: 'required', message: 'Enter end date' },
	],
	image: [
		{ type: 'required', message: 'Please upload a image' },
	],

};

export const offerFormErrors = {
	title: [
		{ type: 'required', message: 'Enter title' }
	],
	description: [
		{ type: 'required', message: "Enter  description" }
	],
	startDate: [
		{ type: 'required', message: 'Enter start date' },
	],
	endDate: [
		{ type: 'required', message: 'Enter end date' },
	],
	image: [
		{ type: 'required', message: 'Please upload a image' },
	],
};

export const coinFormErrors = {
	eventTitle: [
		{ type: 'required', message: 'Select at least one event title' }
	],
	coin: [
		{ type: 'required', message: "Enter  Coin in number" }
	]
};

export const catalogueFormErrors = {
	title: [
		{ type: 'required', message: 'Enter product name' }
	],
	subCategoryId: [
		{ type: 'required', message: 'Please select sub category' }
	],
	price: [
		{ type: 'required', message: 'Enter price in number' }
	],
	image: [
		{ type: 'required', message: 'Please upload a image' },
	],
	discount: [
		{ type: 'required', message: 'Enter discount' },
		{ type: 'maxDiscount', message: 'Discount cannot be more than 100%' },
	],

};

export const shopFormErrors = {
	firstName: [
		{ type: 'required', message: 'Enter first name' }
	],
	lastName: [
		{ type: 'required', message: 'Enter last name' }
	],
	email: [
		{ type: 'required', message: 'Enter email address' },
		{ type: 'pattern', message: 'Please enter a valid email address' }
	],
	mobileNumber: [
		{ type: 'required', message: 'Enter mobile number' },
		{ type: 'pattern', message: 'Please enter a valid mobile number' },
		{ type: 'maxlength', message: 'Enter 10 digit number' }
	],
	profilePicture: [
		{ type: 'required', message: 'Please upload a profile picture' },
	],
};
export const shopKYCFormErrors = {
	aadharCard: [
		{ type: 'required', message: 'Please upload aadhar card.' }
	],
};

export const notificationErrors = {
	title: [
		{ type: 'required', message: 'Enter the title' },
		{ type: 'maxlength', message: 'Title cannot be more than 80 characters' }
	],
	message: [
		{ type: 'required', message: 'Enter message' },
		{ type: 'minlength', message: 'Message cannot be more than 200 characters' }
	],
	type: [
		{ type: 'required', message: 'Select type' }
	],
	role: [
		{ type: 'required', message: 'Select user role' }
	]
};


export const businessTypeErrors = {
	name: [
		{ type: 'required', message: 'Enter business type name' },
	],
};


export const addressErrors = {
	line1: [
		{ type: 'required', message: 'Enter address' }
	],
	city: [
		{ type: 'required', message: 'Enter city' }
	],
	state: [
		{ type: 'required', message: 'Enter state' }
	],
	country: [
		{ type: 'required', message: 'Enter countryCode' }
	],
	pincode: [
		{ type: 'required', message: 'Enter pincode' },
		{ type: 'minlength', message: 'Please enter a valid pincode' },
		{ type: 'pattern', message: 'Enter pincode in number' },
	],
};

export const employeeFormErrors = {
	firstName: [
		{ type: 'required', message: 'Enter first name' }
	],
	lastName: [
		{ type: 'required', message: 'Enter last name' }
	],
	email: [
		{ type: 'required', message: 'Enter email address' },
		{ type: 'pattern', message: 'Please enter a valid email address' }
	],
	mobileNumber: [
		{ type: 'required', message: 'Enter mobile number' },
		{ type: 'pattern', message: 'Please enter a valid mobile number' },
		{ type: 'maxlength', message: 'Enter 10 digit number' }
	],
	profilePicture: [
		{ type: 'required', message: 'Please upload a profile picture' },
	],
	designation: [
		{ type: 'required', message: 'Enter Designation' },
	],
	employeeRole: [
		{ type: 'required', message: 'Select Employee Roles' },
	]
};

export const notificationFormErrors = {
	title: [
		{ type: 'required', message: 'Enter title' }
	],
	message: [
		{ type: 'required', message: 'Enter message' }
	],
	role: [
		{ type: 'required', message: 'Enter message' },
	],
};


export const inAppAdModalFormErrors = {
	title: [
		{ type: 'required', message: 'Enter title' }
	],
	description: [
		{ type: 'required', message: "Enter  description" }
	],
	startDate: [
		{ type: 'required', message: 'Enter start date' },
	],
	endDate: [
		{ type: 'required', message: 'Enter end date' },
	],
	image: [
		{ type: 'required', message: 'Please upload a image' },
	],
};

export const discountFormErrors = {
	subCategoryType: [
		{ type: 'required', message: 'Select sub category type' },
	],
	planType: [
		{ type: 'required', message: 'Select plan type' },
	],
	discount: [
		{ type: 'required', message: 'Enter discount' }
	]
};


export const freePlanFormErrors = {
	planTitle: [
		{ type: 'required', message: 'Enter plan name' },
	],
	planType: [
		{ type: 'required', message: 'Select plan type' },
	],
	subscriptionPrice: [
		{ type: 'required', message: 'Enter amount' }
	],
	duration: [
		{ type: 'required', message: 'Enter duration' }
	],
	interval: [
		{ type: 'required', message: 'Enter interval' }
	]
};