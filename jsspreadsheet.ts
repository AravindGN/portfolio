import jspreadsheet from 'jspreadsheet';
import 'jspreadsheet/dist/jspreadsheet.css';
import 'jsuites/dist/jsuites.css';
import { license_key } from '../license';

jspreadsheet.setLicense(license_key);

export default jspreadsheet;
