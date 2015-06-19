'use strict';
angular.module('corporateApp')
	.controller('faqController', ['$scope', function($scope){
		var faqs = [{
			name: "General",
			faqs: [{
				que: 'What is TaxiForSure Enterprise?',
				ans: "<i>TaxiForSure Enterprise</i> is a power packed innovation that empowers organisations to transform the way their employees move. You can now book a taxi for their employees easily through our dedicated online portal. You can also manage bookings, enable cashless travel, view digital bills of all the serviced bookings and analyse usage reports by just logging into our dedicated portal."
			},{
				que: 'What type of cars are available for TaxiForSure Enterprise customers?',
				ans: "Employees can choose from a wide array of car options which includes Hatchbacks, Sedans and SUVs."
			}, {
				que: 'What are the locations where TaxiForSure Enterprise offers its service?',
				ans: "Currently TaxiForSure Enterprise services are available in most of the major cities of India. Here is a list of all cities where TaxiForSure Enterprise services are available <a href='http://www.taxiforsure.com/' target='_blank'>http://www.taxiforsure.com/</a>"
			}, {
				que: 'How is TaxiForsure Enteprise different from existing operators in the market?',
				ans: [
						"TaxiforSure brings you unmatched value and a new way to book and manage your taxi bookings. Some of the many advantages of choosing TaxiForSure Enterprise service for your company and employees are:",
						"<ul>",
							"<li>Easier to manage and book taxis.</li>",
							"<li>Real time tracking to ensure safety of the passenger.</li>",
							"<li>View all details like driver name, contact details, vehicle number and Estimated Time of Arrival.</li>",
							"<li>Download billing and invoice details with just one click.</li>",
							"<li>Cashless payment.</li>",
							"<li>Present across 44 cities in India.</li>",
						"</ul>"
					].join("")
			}, {
				que: 'How secure is to use TaxiForSure Enterprise service?',
				ans: [
					"Our taxi service is way safer and securer compared to the traditional taxis. Here’s how we make it safe:",
					"<ul>",
						"<li>All taxis are GPS enabled so you can track the position of the taxi in real time.</li>",
						"<li>We conduct mandatory background check for all drivers and vehicles.</li>",
					"</ul>"
				].join("")
			}]
		}, {
			name: "Registration",
			faqs: [{
				que: 'How can I register for TaxiForSure Enterprise?',
				ans: "You can register and start booking taxi for your employees easily. Go to <a href='/sign-up'>http://corporate.taxiforsure.com/sign-up</a> and fill in your company details and contact information to register instantly. Once you have registered, we would verify and activate the account after 24 hours. You can start booking after activation of your account."
			}, {
				que: 'How will I know if my account is activated?',
				ans: "You would receive a mail once your account is activated. Your activation mail would contain the credentials to login to your account. You can then setup your account and start booking. You will be required to reset your password for the first time when you login."
			}, {
				que: 'What are the requirements for my company to sign up?',
				ans: "There are no specific requirements for an organisation to sign up and use TaxiForSure Enterprise service. You need to be legally registered entity to sign up."
			}, {
				que: 'How does billing work?',
				ans: "Billing is very simple. Once the trip is completed, a digital trip bill will be sent to your registered e-mail id along with all the trip details. You can also download the trip bill from your online dashboard. For prepaid bookings, you can select the invoice and download the invoice as per your convenience."
			}, {
				que: 'Can I create multiple users for my organisation account?',
				ans: "Yes! You can add multiple users for your company account and give them different permissions/actions. You can give admin permission (Travel Admin) or booking permissions (Travel manager) to your users."
			}, {
				que: 'Do employees need their own TaxiForSure accounts to use TaxiForSure Business?',
				ans: "Not as of now. Admin can book the taxi for the employees as and when required. This would provide a complete control in the initial rollout. We would soon provide a facility to create logins for your employees so that they can book a taxi on their own. Of course, you will be able to track the usage by each employee."
			}, {
				que: 'I am not sure about registering now. I want more information about the TaxiForSure Enterprise service. How can I get in touch with someone at TaxiForSure?',
				ans: "You can submit your inquiry at <a href='/'>http://corporate.taxiforsure.com/</a> and click on ”Get a Call back” button. Fill in the inquiry form and submit. Our sales team would get in touch with you shortly after submission of the query."
			}]
		}, {
			name: "Pricing & Payments",
			faqs: [{
				que: 'How can I pay for TaxiForSure Enterprise service?',
				ans: [
					"You can choose either or both of the following ways to pay for TaxiForSure Enterprise service",
					"<ul>",
						"<li><b>Cash payment:</b> If you choose Cash payment mode while booking, your employees can pay for the trip at the end of the trip. Final trip bill will be sent to the employee for reimbursement and other processing.</li>",
						"<li><b>Prepaid account:</b> Organisations can create a TaxiForSure Enterprise prepaid account and trip fare would get deducted from the prepaid account at the end of the trip. This way you can enable cashless travel for your employees.</li>",
					"</ul>"
				].join("")
			}, {
				que: 'What is the pricing for the TaxiForSure Enterprise service?',
				ans: "To find the pricing for corporates, go to <a href='http://www.taxiforsure.com/' target='_blank'>www.taxiforsure.com</a> and click on “Fare Chart” link."
			}, {
				que: 'How can I recharge my prepaid account?',
				ans: "As of now, you can transfer money to TaxiForSure Bank account or drop a cheque in favour of our bank account. You can drop a mail about the money transfer to <a href='mailto:enterprise-payments@taxiforsure.com'>enterprise-payments@taxiforsure.com</a>. Your account will be recharged within 24 hours of receiving the payment.<br/>Recharge through online payment gateway facility would soon be available to recharge your account instantly."
			}, {
				que: 'Will I get an invoice for my taxi bill in case I pay through prepaid payment option?',
				ans: "Yes. You can download the invoice as per your need in the Enterprise portal admin section. You can select the list of bookings based on a date range and generate invoice for the same."
			}]
		}]

		faqs[0].activeCls = "activeLi";
		$scope.faqs = faqs;
		$scope.selectedFAQ = faqs[0].faqs;
		$scope.tabClick = function(faq){
			for( var key in $scope.faqs){
				$scope.faqs[key].activeCls = "";
			}
			$scope.selectedFAQ = faq.faqs;
			faq.activeCls = "activeLi";
		}

	}]);
