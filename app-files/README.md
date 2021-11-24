# Bloodaxe Poetry App - App files



**This folder and its subfolders form a template for the structure of the Bloodaxe Poetry mobile app, which can be found at:**

**https://www.bloodaxebooks.com/poetry-apps**



The app allows readers to read, watch, listen to, and share poetry on their mobile devices. Users can search the app for a particular poem or poet, or be guided by the random opening lines appearing at the screen.



### Framework

The app was built using the Cordova framework, and this folder sits within the 'www' folder of a Cordova build. Instructions on using Cordova to build a mobile application can be found at: 

https://cordova.apache.org/docs/en/latest/guide/cli/index.html



### Third-party software used

The app uses and builds upon the following open source libraries for some of its functions:

- **Hammer.js** - used to improve touchscreen responsiveness (MIT License - Copyright can be found in js/hammer.js, license at https://opensource.org/licenses/MIT)
- **HTML2Canvas** - used to generate images of poems for sharing (MIT License - Copyright and license can be found in js/html2canvas-0.5.0-beta4/LICENSE.txt)
- **JQuery / JQuery UI** - used throughout for UI design (MIT License - Copyright and license can be found in js/jquery-1.11.1.min.js)
- **Velocity.js** - used to improve touchscreen responsiveness (MIT License - Copyright and license can be found in js/velocity.min.js)



### Content

An idea of the stucture of the the app's interface can be found in the index.html file. The app uses a single-page model for its HTML, and so each of the app's pages are represented as top-level divs within the body of this HTML. 

The app's functions are all controlled from the index.js file within the 'js' folder. The function of each segment of code is indicated by comments within the file. 

Image assets for the app's interface can be found in the 'img' and 'themes' folders. 

The two JSON files contain the offline versions of the app data - the information on poets, poems, and categories within the app - which is used by the app in the event that it cannot establish a connection with the online database.

