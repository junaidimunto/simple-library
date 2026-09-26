class Wilayah {
	
	constructor(provinceID = "", regencyID = "" , districtID = "", villageID = "") {
		
		//need a validation before use so the rules not broken	
		this.BASE_API_URL	= "https://api.kodewilayah.web.id";
		
		//tag select ID and name are identic : default value is right there
		this.provinceID 	= provinceID !== "" ? provinceID : "provinceSelect" ;
		this.regencyID 		= regencyID !== "" ? regencyID : "regencySelect";
		this.districtID		= districtID !== "" ? districtID : "districtSelect";
		this.villageID 		= villageID !== "" ? villageID : "villageSelect";
		
		//check current existing select tags
		this.checkCurrentSelect();
		
		//label for first option, default in bahasa
		this.provinceLabel = "Pilih provinsi";
		this.regencyLabel  = "Pilih kabupaten";
		this.districtLabel = "Pilih kecamatan";
		this.villageLabel  = "Pilih kelurahan";
		
		//check current existing first option as label
		this.checkCurrentLabel();
		
		//defining some config for further use
		this.config = {
			baseAPIUrl : this.BASE_API_URL,
			notificationElementID : "wilayah-simple-notification",
			notificationHideClass : "wilayah-hide",
			notificationTimeout : 5000,
			notificationStyle : "position: fixed; bottom: 20px; right: 20px; z-index: 9999; background-color: #ff4d4d; color: white; padding: 8px 18px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);",
			warnUnselectedOption : false,
			unselectedOptionClass : "wilayah-unselected-option",
			unselectedOptionStyle : "border-color: red; font-weight: normal;",
		};
		
		//always create custom style for accomodate config style
		this.createStyle(this.config.unselectedOptionStyle);
		
		//create simple hidden notification
		this.createSimpleNotification("Notification here!");
		
	}
	
	testAlert(msg) {
		alert(msg);
	}
	
	//checking constructor based on existing selects id with its name
	checkCurrentSelect() {
		
		const getName = (id) => document.getElementById(id)?.getAttribute("name")?.trim() || id;

		this.provinceName = getName(this.provinceID);
		this.regencyName = getName(this.regencyID);
		this.districtName = getName(this.districtID);
		this.villageName = getName(this.villageID);
		
	}
	
	//check first option
	checkCurrentLabel() {
		
		const keys = ['province', 'regency', 'district', 'village'];

		keys.forEach(key => {
			const el = document.getElementById(window[`${key}ID`] || this[`${key}ID`]); // Grabs element using your ID variables
			if (!el) return;

			if (el.length > 0) {
				el.length = 1;
				this[`${key}Label`] = el.value;
			} else {
				el.appendChild(new Option(this[`${key}Label`]));
			}
		});
		
	}
	
	//default fetching data mechanism
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
			//alert("Something went wrong when fetching data!");
			//most likely no internet connection
			//so lets make notification to default selector tag
			this.simpleNotification("Something went wrong, check your internet connection!");

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
		if(cssClass) document.getElementById(this.provinceID).classList.add(...cssClass.trim().split(/\s+/));
		
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
		if(cssClass) document.getElementById(this.regencyID).classList.add(...cssClass.trim().split(/\s+/));
		
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
		if(cssClass) document.getElementById(this.districtID).classList.add(...cssClass.trim().split(/\s+/));
		
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
		if(cssClass) document.getElementById(this.villageID).classList.add(...cssClass.trim().split(/\s+/));		
		
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
	
	async performFetchingProvinces() {
		
		const data = await this.getProvinces();
		const selects = document.getElementById(this.provinceID);
		data.forEach( province => {
			const options = document.createElement("option")
			options.value = province.code;
			options.textContent = province.name;
			selects.appendChild(options);
		});
		
	}
	
	performChangingSelect() {
		const ids = [this.provinceID, this.regencyID, this.districtID, this.villageID];
		const cls = this.config.warnUnselectedOption ? this.config.unselectedOptionClass : "";

		// 1. Ambil element utama dan helper untuk validasi nilai kosong
		const provEl = document.getElementById(this.provinceID);
		const isInvalid = (el) => !el.options[el.selectedIndex]?.hasAttribute("value") || el.value.trim() === "";

		// 2. Cek inisialisasi awal untuk semua dropdown
		if (provEl && isInvalid(provEl)) {
			ids.forEach(id => document.getElementById(id)?.classList.add(cls));
		}

		// 3. Pasang Event Listener secara dinamis menggunakan mapping config
		const configs = [
			{ id: this.provinceID, nextIds: [this.regencyID, this.districtID, this.villageID],	update: (val) => this.updateRegencySelect(val, this.regencyLabel) },
			{ id: this.regencyID,  nextIds: [this.districtID, this.villageID],               		update: (val) => this.updateDistrictSelect(val, this.districtLabel) },
			{ id: this.districtID, nextIds: [this.villageID],                                		update: (val) => this.updateVillageSelect(val, this.villageLabel) },
			{ id: this.villageID,  nextIds: [],                                              		update: null }
		];

		configs.forEach(({ id, nextIds, update }) => {
			document.getElementById(id)?.addEventListener("change", e => {
				const el = e.target;
				const invalid = isInvalid(el);

				// Jalankan fungsi update data anak (jika ada)
				if (update) update(el.value);

				// Toggle class merah pada elemen aktif saat ini (true = add, false = remove)
				el.classList.toggle(cls, invalid);

				// Jika pilihan valid, otomatis buat dropdown di bawahnya menjadi merah kembali
				//if (!invalid) {
					nextIds.forEach(nextId => document.getElementById(nextId)?.classList.add(cls));
				//}
			});
		});
	}
	
	createStyle(unselectedOptionStyle) {
		
		// Check if any stylesheet already contains the selector .wilayah-unselected-option
		const classExists = Array.from(document.styleSheets).some(sheet => {
			try {
				return Array.from(sheet.cssRules).some(rule => rule.selectorText === "."+this.config.unselectedOptionClass);
			} catch (e) {
				// Avoids SecurityErrors from cross-origin stylesheets (like Google Fonts)
				return false; 
			}
		});

		// If it doesn't exist, inject it
		if (!classExists) {
			const style = document.createElement('style');
			style.textContent = "."+this.config.unselectedOptionClass+"{"+unselectedOptionStyle+"}";
			document.head.appendChild(style);
		}
		
	}
	
	simpleNotification(textMessage) {
		
		const notification = document.getElementById(this.config.notificationElementID);
		notification.innerHTML = textMessage;
		
		// 1. Reveal the element by removing the hide class
		notification.classList.remove(this.config.notificationHideClass);
		
		// 2. Wait 5000ms (5 seconds) then hide it again
		setTimeout(() => {
			notification.classList.add(this.config.notificationHideClass);
		}, this.config.notificationTimeout);
	}
	
	createSimpleNotification(innerText) {
		
		const style = document.createElement('style');
		style.textContent = "#"+this.config.notificationElementID+"{"+this.config.notificationStyle+"}";
		document.head.appendChild(style);
		
		// 2. Create the notification div, set its properties, and append it right before </body>
		const div = document.createElement('div');
		div.id = this.config.notificationElementID;
		div.className = this.config.notificationHideClass;
		div.innerHTML = innerText;
		
		
		if(!document.getElementById(this.config.notificationElementID))
			document.body.appendChild(div);
		
	}

		
}
