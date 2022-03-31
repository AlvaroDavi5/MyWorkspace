const apiReq = require("../../services/apiRequester.ts")


// testing async function
test("fetching IBGE API", () => {
	return apiReq.getAllBrazilStates().then(data => {
		expect(data[2].sigla).toBe('AM')
	})
})
