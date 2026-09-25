This library is still under development, and I am open to feedback, suggestions, and ideas that can help improve its functionality and usability. Feel free to share your thoughts or suggestions.

### Wilayah.js
  **Live Demo** is available, check [this one](https://junaidimunto.github.io/simple-library/wilayah.html) out!
1. **Online API required**
   This library uses vanilla js and works online fetching regional data from the [Kode Wilayah API](https://kodewilayah.web.id). Thanks to [@sukristyan](https://github.com/sukristyan) for developing this awsome API.

3. **CDN is recommended**
   Loading the library via CDN is recommended to ensure you are using the latest version:
   https://cdn.jsdelivr.net/gh/junaidimunto/simple-library@main/Wilayah.js

5. **Local file is also supported**
   You can also download `Wilayah.js` and load it locally. The library will still work properly as long as an internet connection is available to access the API.

6. **Example implementation**
   Check more examples in `wilayah.html` source code to suit your project needs. The default value of selected option is the area code.
   ```html
   <select id="the-province" name="province"></select> <br>
   <select id="the-regency" name="regency"></select> <br>
   <select id="the-district" name="district"></select> <br>
   <select id="the-village" name="village"></select>
   
   <script src="https://cdn.jsdelivr.net/gh/junaidimunto/simple-library@4036918/Wilayah.js"></script>
   <script>
      const wilayah = new Wilayah("the-province", "the-regency", "the-district", "the-village");
      wilayah.performFetchingProvinces();
      wilayah.performChangingSelect();
   </script>
   ```
