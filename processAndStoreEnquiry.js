const workflowStaticData = $getWorkflowStaticData('global');
const Enquiry = $("Legal Enquiry").first().json;
const areaOfLaw = $input.first().json.output.areaOfLaw;
let team = 'ge@email.com';

switch (areaOfLaw){
  case 'Corporate & Commercial': team = 'c&c@email.com'; break;
  case 'Intellectual Property': team = 'ip@email.com'; break;
  case 'Employment': team = 'employment@email.com'; break;
  case 'Tax & Banking': team = 't&b@email.com'; break;
  case 'Family': team = 'family@email.com'; break;
  case 'Wills & Probate': team = 'w&p@email.com'; break;
  case 'Property': team = 'property@email.com'; break;
  case 'Personal Injury': team = 'pi@email.com'; break;
  case 'Immigration': team = 'immigration@email.com'; break;
  case 'Civil Disputes': team = 'cd@email.com'; break;
  case 'Criminal': team = 'criminal@email.com'; break;
  case 'Human Rights': team = 'hrights@email.com'; break;
  case 'Environmental': team = 'env@email.com'; break;
}

if (!workflowStaticData.enquiryCounter){
  workflowStaticData.enquiryCounter = 0;
}
workflowStaticData.enquiryCounter += 1;
const enquiryID = 'ENQ-' + String(workflowStaticData.enquiryCounter).padStart(5,'0');

const newEnquiry = {
  ...Enquiry,
  areaOfLaw : areaOfLaw,
  team : team,
  enquiryID : enquiryID
};

if (!workflowStaticData.enquiry){
  workflowStaticData.enquiry = [];
}

workflowStaticData.enquiry.push(newEnquiry);

return [{json : newEnquiry}];