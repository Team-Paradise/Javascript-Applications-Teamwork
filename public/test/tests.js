
import {validUserNamePassword, validName, validEmail} from '/scripts/validator.js';

var expect = chai.expect;

describe('Validator', function () {

	var validateUsername = validator.validName,
		validatePassword = validator.validUserNamePassword,
		validateMail = validator.validEmail,
		validateURL = validator.validURL;

	it('expects to return false with usernames that contain invalid characters', function () {
		var invalidUsernames = ['djordjano.iliuminat', 'sexy_kuchka_99', 'toshko/kilovata'];

		invalidUsernames.forEach(function (name) {
			expect(validateUsername(name)).to.be.false;
		});
	});

	it('expects to return false with empty and whitespace usernames', function () {
		var results = ['', '    '];

		results.forEach(function (result) {
			expect(validateUsername(result)).to.be.false;
		});
	});

	it('expects to return false with usernames that has incorrect length', function () {
		var incorrectUsernamesLength = ['BasiGadniqUsernameNeUspqLiDaIzmislishPoDylga', '1', 'asd'];

		incorrectUsernamesLength.forEach(function (result) {
			expect(validateUsername(result)).to.be.false;
		});
	});

	it('expects  to return true with valid usernames', function () {
		var validUsernames = ['ninjaaa', 'pesho', 'stamat'];

		validUsernames.forEach(function (name) {
			expect(validateUsername(name)).to.be.true;
		});
	});

	it('expects to return false with empty and whitespace passwords', function () {
		var emptyPasswords = ['', '    '];

		emptyPasswords.forEach(function (result) {
			expect(validatePassword(result)).to.be.false;
		});
	});

	it('expects to return false with passwords that has incorrect length', function () {
		var incorrectPasswords = ['BasiGadnataParolaNeUspqLiDaIzmislishPoDylga', '1', 'asd'];

		incorrectPasswords.forEach(function (pass) {
			expect(validatePassword(pass)).to.be.false;
		});
	});

	it('expects to return true with valid passwords', function () {
		var validPasswords = ['11111', 'goshuu', '12345'];

		validPasswords.forEach(function (pass) {
			expect(validatePassword(pass)).to.be.true;
		});
	});

	it('expects to return false with invalid emails', function () {
		var invalidEmails = ['djordjano()payner.bg', 'AstraGsi,,,,@opc.com', 'nin@ja@abv.bg'];

		invalidEmails.forEach(function (mail) {
			expect(validateMail(mail)).to.be.false;
		});
	});

	it('expects to return true with valid emails', function () {
		var validEmails = ['djordjano@payner.bg', 'AstraGsi@opc.com', 'ninja@abv.bg'];

		validEmails.forEach(function (mail) {
			expect(validateMail(mail)).to.be.true;
		});
	});

	it('expects to return false with invalid url', function () {
		var invalidURLs = ['djordjanopayner.bg', 'AstraGsi,,,,@opc.com', 'nin@ja@abv.bg'];

		invalidURLs.forEach(function (url) {
			expect(validateURL(url)).to.be.false;
		});
	});
	
	it('expects to return true with valid url', function () {
		var validURLs= ['https://en.wikipedia.org/', 'http://www.radionova.bg/', 'http://asdf.com'];

		validURLs.forEach(function (url) {
			expect(validateURL(url)).to.be.true;
		});
	});

});