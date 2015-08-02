var connect = require('../../lib/salesforce/conn.js');
var getExternalContacts = require('../../lib/salesforce/getExternalContacts.js');
var getNotificationList = require('../../lib/salesforce/getNotificationList.js');
var getSoSiteId = require('../../lib/salesforce/getSoSiteId.js');
var sendNoti = require('../../lib/sangreNotifications.js');
var getSpecimenOrder = require('../../lib/salesforce/getSpecimenOrder.js');
var getProjectManager = require('../../lib/salesforce/get-project-manager.js');

var SANGRE_ADVERSE_EVENT = "Sangre_Adverse_Event_Notification__c";
var SANGRE_NO_SHOW = "Sangre_No_Show_Notification__c";
var UNSUCCESSFUL_DRAW = "Sangre_Unsuccessful_Draw_Notification__c";
var SUCCESSFUL_DRAW = "Sangre_Successful_Draw_Notification__c";

// Test Specimen Order
// var soId = "a2OE00000001M3Q";

// SO on Matt that is listed in his Collections
// var soId = "a2OE00000001M3VMAU";

// SO from Evan that is NOT in his Collections
// var soId = "a2OE00000001MX9MAM";

// SO from Evan ths is in his Collections
var soId = "a2OE00000001MXJ";
var siteId = '001E0000019edy9';
var data = {
  Adverse_Event__c: true,
  Adverse_Event_Comment__c: 'HEY GUYS THE PATIENT HAD A BADVERSE EVENT.'
};

// var data = {
//   Incomplete_Draw_Explanation__c: 'Donor No Show'
// };

// var data = {
//   serp__Status__c: 'Pending/In Transit'
// }

// var data = {
//   serp__Status__c: 'Incomplete'
// };
// Demo Site
// var site = "001E0000019edy9";

sendNoti(soId, data);
// getNotificationList(soId, SANGRE_NO_SHOW);
// getSpecimenOrder(soId).then(function(result){
  // console.log(result);
// });

// getProjectManager(siteId).then(function(result){
//   console.log(result);
// });
