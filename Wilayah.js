class Wilayah {
	
	constructor(provinceID = "", regencyID = "" , districtID = "", villageID = "") {
		
		//tag select ID and name are identic
		this.provinceID 	= provinceID !== "" ? provinceID : "provinceSelect" ;
		this.regencyID 		= regencyID !== "" ? regencyID : "regencySelect";
		this.districtID		= districtID !== "" ? districtID : "districtSelect";
		this.villageID 		= villageID !== "" ? villageID : "villageSelect";
		
		this.provinceName	= this.provinceID;
		this.regencyName 	= this.regencyID;
		this.districtName	= this.districtID;
		this.villageName 	= this.villageID;
		
		//label for first option, default in bahasa
		this.provinceLabel = "Pilih provinsi";
		this.regencyLabel  = "Pilih kabupaten";
		this.districtLabel = "Pilih kecamatan";
		this.villageLabel  = "Pilih kelurahan";
		
		//need a validation before use, the url might be changed or removed
		this.BASE_API_URL	= "https://api.kodewilayah.web.id";
	}
	
	testAlert(msg) {
		alert(msg);
	}
	
	async fetchingAPI(url) {
		
		try {
			const response = await fetch(
				this.BASE_API_URL + url
			);

			if (!response.ok) {
				throw new Error("Error fetching API data!");
			}

			const result = await response.json();
			const data = result.data;
			console.log(data);
			return data;

		} catch (error) {

			console.error(error);
			//alert("Something went wrong when fetching data!"); do nothing

		}
		
	}
	
	getProvinces() {
		return this.fetchingAPI("/provinces");
	}
	
	getRegencies(provinceCode) {
		return this.fetchingAPI("/regencies/"+provinceCode);
	}
	
	getDistricts(regencyCode) {
		return this.fetchingAPI("/districts/"+regencyCode);
	}
	
	getVillages(districtCode) {
		return this.fetchingAPI("/villages/"+districtCode);
	}
	
	async printProvinceSelect(label, cssClass = "", attr = "") { //optional attr like required or others
		
		this.provinceLabel = label;
		const openerTag = "<select name=\""+this.provinceName+"\" id=\""+this.provinceID+"\" "+attr+">";
		const closeTag = "</select>";
		const firstOption = "<option>"+label+"</option>";
		
		document.write(openerTag + firstOption + closeTag);
		if(cssClass) document.getElementById(this.provinceID).classList.add(cssClass);
		
		const data = await this.getProvinces();
		const selects = document.getElementById(this.provinceID);
		data.forEach( province => {
			const options = document.createElement("option")
			options.value = province.code;
			options.textContent = province.name;
			selects.appendChild(options);
		});
		
	}
	
	async printRegencySelect(label, cssClass = "", attr = "") { //optional attr like required or others
		
		this.regencyLabel = label;
		const openerTag = "<select name=\""+this.regencyName+"\" id=\""+this.regencyID+"\" "+attr+">";
		const closeTag = "</select>";
		const firstOption = "<option>"+label+"</option>";
		
		document.write(openerTag + firstOption + closeTag);
		if(cssClass) document.getElementById(this.regencyID).classList.add(cssClass);
		
	}
	
	async updateRegencySelect(provinceCode, label) {
		
		const selects = document.getElementById(this.regencyID);
		selects.innerHTML = "<option>"+label+"</option>";
		
		//district and village Reset
		document.getElementById(this.districtID).length = 1;
		document.getElementById(this.villageID).length = 1;
		
		const data = await this.getRegencies(provinceCode);
		data.forEach( regency => {
			const options = document.createElement("option")
			options.value = regency.code;
			options.textContent = regency.name;
			selects.appendChild(options);
		});
		
		
	}
	
	async printDistrictSelect(label, cssClass = "", attr = "") { //optional attr like required or others
		
		this.districtLabel = label;
		const openerTag = "<select name=\""+this.districtName+"\" id=\""+this.districtID+"\" "+attr+">";
		const closeTag = "</select>";
		const firstOption = "<option>"+label+"</option>";
		
		document.write(openerTag + firstOption + closeTag);
		if(cssClass) document.getElementById(this.districtID).classList.add(cssClass);
		
	}
	
	async updateDistrictSelect(regencyCode, label) {
		
		const selects = document.getElementById(this.districtID);
		selects.innerHTML = "<option>"+label+"</option>";
		
		//village Reset
		document.getElementById(this.villageID).length = 1;
		
		const data = await this.getDistricts(regencyCode);
		data.forEach( district => {
			const options = document.createElement("option")
			options.value = district.code;
			options.textContent = district.name;
			selects.appendChild(options);
		});
		
	}
	
	async printVillageSelect(label, cssClass = "", attr = "") { //optional attr like required or others
		
		this.villageLabel = label;
		const openerTag = "<select name=\""+this.villageName+"\" id=\""+this.villageID+"\" "+attr+">";
		const closeTag = "</select>";
		const firstOption = "<option>"+label+"</option>";
		
		document.write(openerTag + firstOption + closeTag);
		if(cssClass) document.getElementById(this.villageID).classList.add(cssClass);		
		
	}

	async updateVillageSelect(districtCode, label) {
		
		const selects = document.getElementById(this.villageID);
		selects.innerHTML = "<option>"+label+"</option>";
		
		const data = await this.getVillages(districtCode);
		data.forEach( village => {
			const options = document.createElement("option")
			options.value = village.code;
			options.textContent = village.name;
			selects.appendChild(options);
		});
		
	}
	
	performChangingSelect() {
		
		document.getElementById(this.provinceID).addEventListener("change", e => {
			this.updateRegencySelect(e.target.value, this.regencyLabel);
		});
		
		document.getElementById(this.regencyID).addEventListener("change", e => {
			this.updateDistrictSelect(e.target.value, this.districtLabel);
		});
		
		document.getElementById(this.districtID).addEventListener("change", e => {
			this.updateVillageSelect(e.target.value, this.villageLabel);
		});
		
	}
	
}
