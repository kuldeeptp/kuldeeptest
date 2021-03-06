'use strict';

define('web/tests/adapters/application.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - adapters/application.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'adapters/application.js should pass ESLint.\n4:8  - \'ENV\' is not defined. (no-undef)');
  });
});
define('web/tests/app.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - app.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint.\n');
  });
});
define('web/tests/authenticators/application.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - authenticators/application.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'authenticators/application.js should pass ESLint.\n');
  });
});
define('web/tests/authorizers/application.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - authorizers/application.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'authorizers/application.js should pass ESLint.\n');
  });
});
define('web/tests/components/coverdoption-list.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - components/coverdoption-list.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/coverdoption-list.js should pass ESLint.\n8:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n9:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n10:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n10:10  - \'oc\' is assigned a value but never used. (no-unused-vars)\n11:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n12:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n13:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n14:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n15:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n15:6  - Unexpected console statement. (no-console)\n18:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n19:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n21:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n22:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n22:7  - Unexpected console statement. (no-console)\n23:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n24:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n25:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n26:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n27:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n28:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n28:7  - Unexpected console statement. (no-console)\n30:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n31:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n32:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n33:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n34:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n35:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n36:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n38:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n38:6  - Unexpected console statement. (no-console)\n39:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n41:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n41:6  - Unexpected console statement. (no-console)\n43:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)');
  });
});
define('web/tests/components/fii-listing.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - components/fii-listing.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/fii-listing.js should pass ESLint.\n19:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)');
  });
});
define('web/tests/components/gann-data.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - components/gann-data.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/gann-data.js should pass ESLint.\n21:2  - \'$\' is not defined. (no-undef)\n22:7  - Unexpected console statement. (no-console)\n25:7  - Unexpected console statement. (no-console)\n26:7  - Unexpected console statement. (no-console)\n32:14  - \'degree\' is defined but never used. (no-unused-vars)\n34:6  - Unnecessary semicolon. (no-extra-semi)\n37:14  - \'degreeDiff\' is defined but never used. (no-unused-vars)\n39:6  - Unnecessary semicolon. (no-extra-semi)\n41:14  - \'priceAngle\' is defined but never used. (no-unused-vars)\n43:6  - Unnecessary semicolon. (no-extra-semi)\n76:14  - \'getGannRangeX\' is defined but never used. (no-unused-vars)\n96:6  - Unnecessary semicolon. (no-extra-semi)\n120:6  - Unnecessary semicolon. (no-extra-semi)\n132:11  - \'p45\' is already defined. (no-redeclare)\n143:6  - Unnecessary semicolon. (no-extra-semi)\n145:14  - \'gannRange\' is defined but never used. (no-unused-vars)\n165:6  - Unnecessary semicolon. (no-extra-semi)\n176:6  - Unnecessary semicolon. (no-extra-semi)\n179:14  - \'gannMagic\' is defined but never used. (no-unused-vars)\n183:11  - \'tradingDays\' is assigned a value but never used. (no-unused-vars)\n184:11  - \'stDate1\' is assigned a value but never used. (no-unused-vars)\n184:21  - \'stDate\' is not defined. (no-undef)\n184:30  - \'baseDate\' is not defined. (no-undef)\n185:11  - \'priceDirection\' is assigned a value but never used. (no-unused-vars)\n189:7  - Unexpected console statement. (no-console)\n191:7  - \'baseDate\' is not defined. (no-undef)\n191:24  - \'baseDate\' is not defined. (no-undef)\n192:23  - \'baseDate\' is not defined. (no-undef)\n193:7  - \'baseDate\' is not defined. (no-undef)\n193:24  - \'baseDate\' is not defined. (no-undef)\n194:23  - \'baseDate\' is not defined. (no-undef)\n196:7  - \'baseDate\' is not defined. (no-undef)\n196:24  - \'baseDate\' is not defined. (no-undef)\n197:23  - \'baseDate\' is not defined. (no-undef)\n199:7  - \'baseDate\' is not defined. (no-undef)\n199:24  - \'baseDate\' is not defined. (no-undef)\n200:23  - \'baseDate\' is not defined. (no-undef)\n202:7  - \'stDate\' is not defined. (no-undef)\n202:22  - \'stDate\' is not defined. (no-undef)\n203:23  - \'stDate\' is not defined. (no-undef)\n205:7  - \'stDate\' is not defined. (no-undef)\n205:22  - \'stDate\' is not defined. (no-undef)\n206:23  - \'stDate\' is not defined. (no-undef)\n214:16  - \'i\' is already defined. (no-redeclare)\n220:7  - Unexpected console statement. (no-console)\n221:7  - Unexpected console statement. (no-console)\n222:6  - Unnecessary semicolon. (no-extra-semi)');
  });
});
define('web/tests/components/greek-chart.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - components/greek-chart.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/greek-chart.js should pass ESLint.\n12:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n14:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n16:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n17:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n18:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n19:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n20:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n21:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n22:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n23:3  - Unexpected console statement. (no-console)\n24:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n25:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n26:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n28:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n29:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n32:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n33:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n34:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n35:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n36:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n37:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n38:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n40:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n41:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n44:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n45:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n47:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n47:16  - \'i\' is already defined. (no-redeclare)\n48:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n49:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n51:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n53:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n54:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n55:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n55:13  - Unexpected console statement. (no-console)\n56:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n57:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n58:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n59:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n59:13  - Unexpected console statement. (no-console)\n60:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n61:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n62:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n63:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n64:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n64:13  - Unexpected console statement. (no-console)\n65:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n66:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n67:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n68:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n68:13  - Unexpected console statement. (no-console)\n69:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n70:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n71:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n72:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n73:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n74:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n75:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n76:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n78:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n79:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n80:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n81:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n82:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n83:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n84:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n85:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n86:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n87:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n88:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n89:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n90:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n91:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n92:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n93:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n94:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n96:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n97:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n98:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n99:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n100:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n102:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n103:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n104:5  - Unnecessary semicolon. (no-extra-semi)\n107:4  - Unexpected console statement. (no-console)\n109:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n109:7  - Unnecessary semicolon. (no-extra-semi)\n115:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n116:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n117:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n118:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n119:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n120:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n121:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n122:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n123:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n124:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n125:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n126:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n127:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n128:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n129:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n130:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n131:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n132:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n133:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n134:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n135:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n136:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n137:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n138:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n139:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n140:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n141:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n142:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n143:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n144:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n145:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n146:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n147:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n148:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n149:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n151:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n152:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n153:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n154:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n155:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n156:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n157:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n158:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n159:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n159:6  - Duplicate key \'plotOptions\'. (no-dupe-keys)\n160:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n161:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n162:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n163:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n164:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n165:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n166:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n167:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n168:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n169:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n170:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n171:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n172:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n173:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)');
  });
});
define('web/tests/components/option-chart.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - components/option-chart.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/option-chart.js should pass ESLint.\n2:5  - \'profitStrategy1\' is defined but never used. (no-unused-vars)\n27:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n31:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n32:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n33:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n34:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n34:10  - \'netGreek\' is assigned a value but never used. (no-unused-vars)\n35:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n36:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n37:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n37:10  - \'pal\' is assigned a value but never used. (no-unused-vars)\n40:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n40:6  - Unexpected console statement. (no-console)\n41:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n41:6  - Unexpected console statement. (no-console)\n43:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n43:6  - Unexpected console statement. (no-console)\n45:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n45:6  - Unexpected console statement. (no-console)\n47:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n47:6  - Unexpected console statement. (no-console)\n50:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n51:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n51:40  - Unnecessary semicolon. (no-extra-semi)\n56:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n57:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n60:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n61:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n63:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n65:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n66:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n66:11  - \'strikeLength\' is assigned a value but never used. (no-unused-vars)\n67:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n68:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n69:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n70:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n71:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n73:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n73:16  - \'i\' is already defined. (no-redeclare)\n75:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n77:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n79:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n80:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n81:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n82:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n84:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n85:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n85:13  - Unexpected console statement. (no-console)\n86:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n87:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n88:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n89:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n90:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n91:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n92:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n93:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n94:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n95:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n96:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n97:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n98:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n99:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n101:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n102:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n103:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n104:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n105:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n106:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n107:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n108:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n109:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n110:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n111:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n112:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n113:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n114:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n116:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n117:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n118:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n119:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n120:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n120:8  - Unexpected console statement. (no-console)\n122:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n123:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n124:5  - Unnecessary semicolon. (no-extra-semi)\n125:4  - Unexpected console statement. (no-console)\n128:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n128:7  - Unnecessary semicolon. (no-extra-semi)\n129:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n131:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n132:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n133:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n134:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n135:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n136:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n137:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n137:5  - Unexpected console statement. (no-console)\n138:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n138:5  - Unexpected console statement. (no-console)\n140:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n142:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n145:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n147:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n148:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n149:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n150:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n151:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n152:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n153:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n154:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n155:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n156:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n157:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n158:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n159:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n160:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n161:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n162:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n163:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n164:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n165:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n166:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n167:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n168:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n169:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n170:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n171:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n172:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n173:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n174:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n175:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n176:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n177:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n178:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n179:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n180:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n181:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n183:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n184:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n185:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n186:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n187:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n188:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n189:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n190:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n191:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n191:6  - Duplicate key \'plotOptions\'. (no-dupe-keys)\n192:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n193:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n194:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n195:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n196:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n197:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n198:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n199:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n200:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n201:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n202:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n203:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n204:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n205:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)');
  });
});
define('web/tests/components/option-form.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - components/option-form.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/option-form.js should pass ESLint.\n27:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n29:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n31:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n33:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n35:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n37:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n39:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n42:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n43:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n51:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n53:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n54:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n55:4  - Unexpected console statement. (no-console)\n56:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n57:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n58:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n59:4  - Unexpected console statement. (no-console)\n60:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n61:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n62:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n63:4  - Unexpected console statement. (no-console)\n64:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n65:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n66:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n67:4  - Unexpected console statement. (no-console)\n68:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n69:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n70:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n72:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n73:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n73:8  - Unexpected console statement. (no-console)\n74:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n75:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n77:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n79:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n80:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n81:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n82:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n92:4  - Unexpected console statement. (no-console)\n104:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n106:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n112:4  - Unexpected console statement. (no-console)\n113:4  - Unexpected console statement. (no-console)\n118:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n119:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n120:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n162:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)');
  });
});
define('web/tests/components/stock-list.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - components/stock-list.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/stock-list.js should pass ESLint.\n17:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n19:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n21:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n21:6  - Unexpected console statement. (no-console)\n21:18  - \'greek\' is not defined. (no-undef)\n22:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n27:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n28:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n28:10  - \'pal\' is assigned a value but never used. (no-unused-vars)\n34:4  - Unexpected console statement. (no-console)\n35:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n36:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n37:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n38:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n39:4  - Unexpected console statement. (no-console)\n41:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n42:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n42:9  - \'$\' is not defined. (no-undef)\n43:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n44:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n44:14  - Unexpected console statement. (no-console)\n45:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n46:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n47:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n48:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n49:4  - Unexpected console statement. (no-console)\n51:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n52:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n52:10  - \'$\' is not defined. (no-undef)\n53:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n54:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n54:14  - Unexpected console statement. (no-console)\n55:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n56:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n57:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n58:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n59:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n60:4  - Unexpected console statement. (no-console)\n62:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n63:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n64:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n65:4  - Unexpected console statement. (no-console)\n67:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n68:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n69:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n70:4  - Unexpected console statement. (no-console)\n72:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n73:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n74:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n75:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n76:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n77:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n78:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n79:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n80:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n81:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n82:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n83:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n84:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n85:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n86:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n87:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n88:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n92:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n92:11  - \'pal\' is assigned a value but never used. (no-unused-vars)\n93:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n94:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n94:7  - Unexpected console statement. (no-console)\n95:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n98:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n99:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n99:142  - Duplicate key \'lot\'. (no-dupe-keys)\n101:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n102:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n103:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n104:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n104:8  - Unexpected console statement. (no-console)\n105:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n106:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n107:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n107:18  - \'greek\' is not defined. (no-undef)\n107:80  - \'greek\' is not defined. (no-undef)\n108:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n110:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n110:30  - \'bs\' is not defined. (no-undef)\n110:93  - \'greek\' is not defined. (no-undef)\n111:140  - Duplicate key \'lot\'. (no-dupe-keys)\n112:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n112:8  - Unexpected console statement. (no-console)\n112:20  - \'greek\' is not defined. (no-undef)\n113:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n115:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n116:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n117:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n118:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n119:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n119:17  - \'i\' is already defined. (no-redeclare)\n120:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n121:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n121:18  - \'greek\' is not defined. (no-undef)\n121:79  - \'greek\' is not defined. (no-undef)\n122:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n124:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n124:30  - \'bs\' is not defined. (no-undef)\n124:92  - \'greek\' is not defined. (no-undef)\n126:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n126:142  - Duplicate key \'lot\'. (no-dupe-keys)\n127:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n127:8  - Unexpected console statement. (no-console)\n127:20  - \'greek\' is not defined. (no-undef)\n128:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n130:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n131:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n132:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n133:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n134:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n135:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n136:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n137:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n138:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n139:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n140:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n141:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n141:7  - Unexpected console statement. (no-console)\n142:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n143:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n144:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n146:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n147:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n148:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n148:7  - Unexpected console statement. (no-console)\n149:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n150:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n151:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n152:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n153:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n154:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n155:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n156:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n158:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n159:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n160:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n161:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n161:7  - Unexpected console statement. (no-console)\n163:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n164:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n165:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n166:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n167:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n168:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n169:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n171:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n171:6  - Unexpected console statement. (no-console)\n172:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n174:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n174:6  - Unexpected console statement. (no-console)');
  });
});
define('web/tests/components/strategy-loader.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - components/strategy-loader.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/strategy-loader.js should pass ESLint.\n3:8  - \'nseOption\' is defined but never used. (no-unused-vars)\n18:4  - Unexpected console statement. (no-console)\n19:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n20:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n22:4  - Unexpected console statement. (no-console)\n23:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n24:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n25:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n26:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n27:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n30:6  - Unexpected console statement. (no-console)\n32:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n33:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n35:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n44:5  - Unexpected console statement. (no-console)\n49:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n49:11  - \'$\' is not defined. (no-undef)\n50:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n53:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)');
  });
});
define('web/tests/components/table-list.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - components/table-list.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/table-list.js should pass ESLint.\n19:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n22:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n23:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n24:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n25:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n26:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n27:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n28:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n29:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n30:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n31:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n32:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n33:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n34:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n35:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n36:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n37:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n38:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n39:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n40:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n41:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n42:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n43:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n44:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n45:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n46:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n47:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n48:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n49:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n50:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n51:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n52:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n53:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n54:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n55:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n56:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n57:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n58:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)');
  });
});
define('web/tests/controllers/faooi.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - controllers/faooi.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/faooi.js should pass ESLint.\n57:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n58:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n59:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n60:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n61:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n62:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n63:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n64:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n65:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n66:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n67:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n68:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n69:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n70:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n71:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n72:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n73:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n74:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n75:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n76:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n77:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n78:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n79:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n80:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n81:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n82:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n83:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n84:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n85:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n86:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n87:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n88:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n89:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n90:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n91:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n92:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n95:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n99:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n100:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n101:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n102:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n103:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n104:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n105:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n106:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n107:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n108:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n109:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n110:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n111:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n112:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n113:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n114:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n115:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n116:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n117:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n118:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n119:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n120:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n121:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n122:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n123:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n124:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n125:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n126:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n127:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n128:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n129:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n130:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n131:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n132:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n133:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n134:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n137:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n142:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n143:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n144:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n145:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n146:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n147:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n148:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n149:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n150:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n151:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n152:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n153:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n154:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n155:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n156:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n157:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n158:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n159:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n160:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n161:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n162:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n163:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n164:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n165:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n166:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n167:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n168:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n169:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n170:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n171:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n172:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n173:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n174:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n175:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n176:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n177:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n180:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n184:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n185:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n186:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n187:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n188:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n189:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n190:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n191:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n192:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n193:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n194:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n195:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n196:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n197:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n198:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n199:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n200:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n201:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n202:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n203:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n204:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n205:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n206:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n207:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n208:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n209:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n210:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n211:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n212:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n213:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n214:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n215:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n216:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n217:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n218:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n219:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n221:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n222:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n227:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n228:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n229:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n230:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n231:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n232:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n233:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n234:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n235:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n236:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n237:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n238:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n239:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n240:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n241:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n242:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n243:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n244:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n245:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n246:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n247:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n248:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n249:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n250:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n251:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n252:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n253:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n254:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n255:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n256:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n257:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n258:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n259:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n260:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n261:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n262:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n264:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n265:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n269:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n270:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n271:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n272:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n273:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n274:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n275:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n276:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n277:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n278:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n279:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n280:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n281:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n282:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n283:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n284:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n285:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n286:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n287:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n288:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n289:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n290:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n291:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n292:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n293:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n294:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n295:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n296:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n297:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n298:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n299:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n300:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n301:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n302:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n303:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n304:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n305:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n306:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n312:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n313:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n314:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n315:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n316:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n317:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n318:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n319:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n320:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n321:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n322:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n323:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n324:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n325:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n326:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n327:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n328:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n329:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n330:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n331:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n332:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n333:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n334:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n335:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n336:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n337:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n338:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n339:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n340:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n341:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n342:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n343:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n344:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n345:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n346:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n347:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n348:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n349:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n354:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n355:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n356:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n357:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n358:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n359:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n360:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n361:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n362:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n363:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n364:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n365:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n366:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n367:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n368:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n369:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n370:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n371:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n372:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n373:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n374:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n375:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n376:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n377:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n378:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n379:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n380:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n381:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n382:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n383:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n384:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n385:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n386:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n387:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n388:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n389:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n390:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n391:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n392:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)');
  });
});
define('web/tests/controllers/option-chart.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - controllers/option-chart.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/option-chart.js should pass ESLint.\n');
  });
});
define('web/tests/controllers/startegy-loader.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - controllers/startegy-loader.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/startegy-loader.js should pass ESLint.\n');
  });
});
define('web/tests/controllers/strategy.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - controllers/strategy.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/strategy.js should pass ESLint.\n');
  });
});
define('web/tests/helpers/aeq-select.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - helpers/aeq-select.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/aeq-select.js should pass ESLint.\n');
  });
});
define('web/tests/helpers/aeq.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - helpers/aeq.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/aeq.js should pass ESLint.\n');
  });
});
define('web/tests/helpers/chart-data.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - helpers/chart-data.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/chart-data.js should pass ESLint.\n');
  });
});
define('web/tests/helpers/date-timestamp.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - helpers/date-timestamp.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/date-timestamp.js should pass ESLint.\n');
  });
});
define('web/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
    if (window.server) {
      window.server.shutdown();
    }
  }
});
define('web/tests/helpers/destroy-app.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - helpers/destroy-app.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint.\n');
  });
});
define('web/tests/helpers/ember-simple-auth', ['exports', 'ember-simple-auth/authenticators/test'], function (exports, _emberSimpleAuthAuthenticatorsTest) {
  exports.authenticateSession = authenticateSession;
  exports.currentSession = currentSession;
  exports.invalidateSession = invalidateSession;

  var TEST_CONTAINER_KEY = 'authenticator:test';

  function ensureAuthenticator(app, container) {
    var authenticator = container.lookup(TEST_CONTAINER_KEY);
    if (!authenticator) {
      app.register(TEST_CONTAINER_KEY, _emberSimpleAuthAuthenticatorsTest['default']);
    }
  }

  function authenticateSession(app, sessionData) {
    var container = app.__container__;

    var session = container.lookup('service:session');
    ensureAuthenticator(app, container);
    session.authenticate(TEST_CONTAINER_KEY, sessionData);
    return wait();
  }

  function currentSession(app) {
    return app.__container__.lookup('service:session');
  }

  function invalidateSession(app) {
    var session = app.__container__.lookup('service:session');
    if (session.get('isAuthenticated')) {
      session.invalidate();
    }
    return wait();
  }
});
/* global wait */
define('web/tests/helpers/gann.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - helpers/gann.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/gann.js should pass ESLint.\n3:7  - \'gann\' is assigned a value but never used. (no-unused-vars)\n63:11  - \'p45\' is already defined. (no-redeclare)\n91:22  - \'dateDiffInDays\' is not defined. (no-undef)\n92:11  - \'tradingDays\' is assigned a value but never used. (no-unused-vars)\n93:11  - \'stDate1\' is assigned a value but never used. (no-unused-vars)\n93:21  - \'stDate\' is not defined. (no-undef)\n93:30  - \'baseDate\' is not defined. (no-undef)\n94:11  - \'priceDirection\' is assigned a value but never used. (no-unused-vars)\n98:7  - Unexpected console statement. (no-console)\n100:7  - \'baseDate\' is not defined. (no-undef)\n100:24  - \'baseDate\' is not defined. (no-undef)\n101:23  - \'baseDate\' is not defined. (no-undef)\n102:7  - \'baseDate\' is not defined. (no-undef)\n102:24  - \'baseDate\' is not defined. (no-undef)\n103:23  - \'baseDate\' is not defined. (no-undef)\n105:7  - \'baseDate\' is not defined. (no-undef)\n105:24  - \'baseDate\' is not defined. (no-undef)\n106:23  - \'baseDate\' is not defined. (no-undef)\n108:7  - \'baseDate\' is not defined. (no-undef)\n108:24  - \'baseDate\' is not defined. (no-undef)\n109:23  - \'baseDate\' is not defined. (no-undef)\n111:7  - \'stDate\' is not defined. (no-undef)\n111:22  - \'stDate\' is not defined. (no-undef)\n112:23  - \'stDate\' is not defined. (no-undef)\n114:7  - \'stDate\' is not defined. (no-undef)\n114:22  - \'stDate\' is not defined. (no-undef)\n115:23  - \'stDate\' is not defined. (no-undef)\n123:16  - \'i\' is already defined. (no-redeclare)\n129:7  - Unexpected console statement. (no-console)\n130:7  - Unexpected console statement. (no-console)');
  });
});
define('web/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember', 'web/tests/helpers/start-app', 'web/tests/helpers/destroy-app'], function (exports, _qunit, _ember, _webTestsHelpersStartApp, _webTestsHelpersDestroyApp) {
  var Promise = _ember['default'].RSVP.Promise;

  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _webTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _webTestsHelpersDestroyApp['default'])(_this.application);
        });
      }
    });
  };
});
define('web/tests/helpers/module-for-acceptance.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - helpers/module-for-acceptance.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint.\n');
  });
});
define('web/tests/helpers/resolver', ['exports', 'web/resolver', 'web/config/environment'], function (exports, _webResolver, _webConfigEnvironment) {

  var resolver = _webResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _webConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _webConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('web/tests/helpers/resolver.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - helpers/resolver.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass ESLint.\n');
  });
});
define('web/tests/helpers/start-app', ['exports', 'ember', 'web/app', 'web/config/environment'], function (exports, _ember, _webApp, _webConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var attributes = _ember['default'].merge({}, _webConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    return _ember['default'].run(function () {
      var application = _webApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('web/tests/helpers/start-app.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - helpers/start-app.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint.\n');
  });
});
define('web/tests/integration/components/coverdoption-list-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('coverdoption-list', 'Integration | Component | coverdoption list', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': '525PA8Yq',
      'block': '{"statements":[["append",["unknown",["coverdoption-list"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': 'yxkMcvO0',
      'block': '{"statements":[["text","\\n"],["block",["coverdoption-list"],null,null,0],["text","  "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      template block text\\n"]],"locals":[]}],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('web/tests/integration/components/coverdoption-list-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - integration/components/coverdoption-list-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/coverdoption-list-test.js should pass ESLint.\n');
  });
});
define('web/tests/integration/components/fii-listing-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('fii-listing', 'Integration | Component | fii listing', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': 'enQRuK9r',
      'block': '{"statements":[["append",["unknown",["fii-listing"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': 'ALWkAfsg',
      'block': '{"statements":[["text","\\n"],["block",["fii-listing"],null,null,0],["text","  "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      template block text\\n"]],"locals":[]}],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('web/tests/integration/components/fii-listing-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - integration/components/fii-listing-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/fii-listing-test.js should pass ESLint.\n');
  });
});
define('web/tests/integration/components/gann-data-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('gann-data', 'Integration | Component | gann data', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': '7cHSJBM0',
      'block': '{"statements":[["append",["unknown",["gann-data"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': 'dYUuR+P5',
      'block': '{"statements":[["text","\\n"],["block",["gann-data"],null,null,0],["text","  "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      template block text\\n"]],"locals":[]}],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('web/tests/integration/components/gann-data-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - integration/components/gann-data-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/gann-data-test.js should pass ESLint.\n');
  });
});
define('web/tests/integration/components/greek-chart-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('greek-chart', 'Integration | Component | greek chart', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': '1XotMSgP',
      'block': '{"statements":[["append",["unknown",["greek-chart"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': '+fw7YzY3',
      'block': '{"statements":[["text","\\n"],["block",["greek-chart"],null,null,0],["text","  "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      template block text\\n"]],"locals":[]}],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('web/tests/integration/components/greek-chart-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - integration/components/greek-chart-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/greek-chart-test.js should pass ESLint.\n');
  });
});
define('web/tests/integration/components/highchart-component-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('highchart-component', 'Integration | Component | highchart component', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': 'b9MiHO8c',
      'block': '{"statements":[["append",["unknown",["highchart-component"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': 'BzLy8U5p',
      'block': '{"statements":[["text","\\n"],["block",["highchart-component"],null,null,0],["text","  "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      template block text\\n"]],"locals":[]}],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('web/tests/integration/components/highchart-component-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - integration/components/highchart-component-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/highchart-component-test.js should pass ESLint.\n');
  });
});
define('web/tests/integration/components/highcharts-theme-mixin-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('highcharts-theme-mixin', 'Integration | Component | highcharts theme mixin', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': 'nBOr8r0P',
      'block': '{"statements":[["append",["unknown",["highcharts-theme-mixin"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': 'G+Xt++6B',
      'block': '{"statements":[["text","\\n"],["block",["highcharts-theme-mixin"],null,null,0],["text","  "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      template block text\\n"]],"locals":[]}],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('web/tests/integration/components/highcharts-theme-mixin-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - integration/components/highcharts-theme-mixin-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/highcharts-theme-mixin-test.js should pass ESLint.\n');
  });
});
define('web/tests/integration/components/option-chart-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('option-chart', 'Integration | Component | option chart', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': 'Mltsavev',
      'block': '{"statements":[["append",["unknown",["option-chart"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': 'K+HpYCRR',
      'block': '{"statements":[["text","\\n"],["block",["option-chart"],null,null,0],["text","  "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      template block text\\n"]],"locals":[]}],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('web/tests/integration/components/option-chart-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - integration/components/option-chart-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/option-chart-test.js should pass ESLint.\n');
  });
});
define('web/tests/integration/components/option-form-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('option-form', 'Integration | Component | option form', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': 'M0l2Kqc1',
      'block': '{"statements":[["append",["unknown",["option-form"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': 'nIySwWT7',
      'block': '{"statements":[["text","\\n"],["block",["option-form"],null,null,0],["text","  "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      template block text\\n"]],"locals":[]}],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('web/tests/integration/components/option-form-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - integration/components/option-form-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/option-form-test.js should pass ESLint.\n');
  });
});
define('web/tests/integration/components/stock-list-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('stock-list', 'Integration | Component | stock list', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': '009es3tq',
      'block': '{"statements":[["append",["unknown",["stock-list"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': 'sn4SRa9X',
      'block': '{"statements":[["text","\\n"],["block",["stock-list"],null,null,0],["text","  "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      template block text\\n"]],"locals":[]}],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('web/tests/integration/components/stock-list-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - integration/components/stock-list-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/stock-list-test.js should pass ESLint.\n');
  });
});
define('web/tests/integration/components/strategy-loader-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('strategy-loader', 'Integration | Component | strategy loader', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': '+lePqBUa',
      'block': '{"statements":[["append",["unknown",["strategy-loader"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': 'w5qSdVIj',
      'block': '{"statements":[["text","\\n"],["block",["strategy-loader"],null,null,0],["text","  "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      template block text\\n"]],"locals":[]}],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('web/tests/integration/components/strategy-loader-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - integration/components/strategy-loader-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/strategy-loader-test.js should pass ESLint.\n');
  });
});
define('web/tests/integration/components/table-list-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('table-list', 'Integration | Component | table list', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': 'c34N+5l9',
      'block': '{"statements":[["append",["unknown",["table-list"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': 'GvQXvR4p',
      'block': '{"statements":[["text","\\n"],["block",["table-list"],null,null,0],["text","  "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      template block text\\n"]],"locals":[]}],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('web/tests/integration/components/table-list-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - integration/components/table-list-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/table-list-test.js should pass ESLint.\n');
  });
});
define('web/tests/models/code.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - models/code.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/code.js should pass ESLint.\n');
  });
});
define('web/tests/models/faooi.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - models/faooi.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/faooi.js should pass ESLint.\n6:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n9:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n12:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n15:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n18:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n21:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)');
  });
});
define('web/tests/models/nseoption.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - models/nseoption.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/nseoption.js should pass ESLint.\n4:11  - \'Ember\' is not defined. (no-undef)\n5:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)');
  });
});
define('web/tests/models/stock.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - models/stock.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/stock.js should pass ESLint.\n');
  });
});
define('web/tests/resolver.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - resolver.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint.\n');
  });
});
define('web/tests/router.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - router.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint.\n');
  });
});
define('web/tests/routes/faooi.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - routes/faooi.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/faooi.js should pass ESLint.\n17:9  - \'store\' is assigned a value but never used. (no-unused-vars)\n25:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n26:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n26:39  - \'error\' is defined but never used. (no-unused-vars)\n27:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n29:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n30:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)');
  });
});
define('web/tests/routes/index.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - routes/index.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/index.js should pass ESLint.\n5:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n6:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n7:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n7:6  - Unexpected console statement. (no-console)\n9:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n11:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n12:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n13:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n15:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n16:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n16:16  - \'transition\' is defined but never used. (no-unused-vars)\n17:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n18:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n20:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n24:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n25:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n26:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n26:9  - Unexpected console statement. (no-console)\n27:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)');
  });
});
define('web/tests/routes/not-found.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - routes/not-found.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/not-found.js should pass ESLint.\n');
  });
});
define('web/tests/routes/strategy.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - routes/strategy.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/strategy.js should pass ESLint.\n');
  });
});
define('web/tests/routes/usoptions.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - routes/usoptions.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/usoptions.js should pass ESLint.\n5:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)');
  });
});
define('web/tests/services/scripts.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - services/scripts.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/scripts.js should pass ESLint.\n7:9  - \'params\' is defined but never used. (no-unused-vars)\n13:4  - Unexpected console statement. (no-console)\n18:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)');
  });
});
define('web/tests/services/stocks.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - services/stocks.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/stocks.js should pass ESLint.\n6:8  - \'params\' is defined but never used. (no-unused-vars)\n12:4  - Unexpected console statement. (no-console)\n17:2  - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)');
  });
});
define('web/tests/test-helper', ['exports', 'web/tests/helpers/resolver', 'ember-qunit'], function (exports, _webTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_webTestsHelpersResolver['default']);
});
define('web/tests/test-helper.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - test-helper.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint.\n');
  });
});
define('web/tests/unit/adapters/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('adapter:application', 'Unit | Adapter | application', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });
});
define('web/tests/unit/adapters/application-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - unit/adapters/application-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/application-test.js should pass ESLint.\n');
  });
});
define('web/tests/unit/controllers/faooi-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:faooi', 'Unit | Controller | faooi', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('web/tests/unit/controllers/faooi-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - unit/controllers/faooi-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/faooi-test.js should pass ESLint.\n');
  });
});
define('web/tests/unit/controllers/option-chart-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:option-chart', 'Unit | Controller | option chart', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('web/tests/unit/controllers/option-chart-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - unit/controllers/option-chart-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/option-chart-test.js should pass ESLint.\n');
  });
});
define('web/tests/unit/controllers/startegy-loader-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:startegy-loader', 'Unit | Controller | startegy loader', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('web/tests/unit/controllers/startegy-loader-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - unit/controllers/startegy-loader-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/startegy-loader-test.js should pass ESLint.\n');
  });
});
define('web/tests/unit/controllers/strategy-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:strategy', 'Unit | Controller | strategy', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('web/tests/unit/controllers/strategy-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - unit/controllers/strategy-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/strategy-test.js should pass ESLint.\n');
  });
});
define('web/tests/unit/helpers/aeq-select-test', ['exports', 'web/helpers/aeq-select', 'qunit'], function (exports, _webHelpersAeqSelect, _qunit) {

  (0, _qunit.module)('Unit | Helper | aeq select');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _webHelpersAeqSelect.aeqSelect)([42]);
    assert.ok(result);
  });
});
define('web/tests/unit/helpers/aeq-select-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - unit/helpers/aeq-select-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/helpers/aeq-select-test.js should pass ESLint.\n');
  });
});
define('web/tests/unit/helpers/aeq-test', ['exports', 'web/helpers/aeq', 'qunit'], function (exports, _webHelpersAeq, _qunit) {

  (0, _qunit.module)('Unit | Helper | aeq');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _webHelpersAeq.aeq)([42]);
    assert.ok(result);
  });
});
define('web/tests/unit/helpers/aeq-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - unit/helpers/aeq-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/helpers/aeq-test.js should pass ESLint.\n');
  });
});
define('web/tests/unit/models/code-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('code', 'Unit | Model | code', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('web/tests/unit/models/code-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - unit/models/code-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/code-test.js should pass ESLint.\n');
  });
});
define('web/tests/unit/models/faooi-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('faooi', 'Unit | Model | faooi', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('web/tests/unit/models/faooi-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - unit/models/faooi-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/faooi-test.js should pass ESLint.\n');
  });
});
define('web/tests/unit/models/nseoption-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('nseoption', 'Unit | Model | nseoption', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('web/tests/unit/models/nseoption-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - unit/models/nseoption-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/nseoption-test.js should pass ESLint.\n');
  });
});
define('web/tests/unit/models/stock-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('stock', 'Unit | Model | stock', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('web/tests/unit/models/stock-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - unit/models/stock-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/stock-test.js should pass ESLint.\n');
  });
});
define('web/tests/unit/routes/faooi-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:faooi', 'Unit | Route | faooi', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('web/tests/unit/routes/faooi-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - unit/routes/faooi-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/faooi-test.js should pass ESLint.\n');
  });
});
define('web/tests/unit/routes/index-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:index', 'Unit | Route | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('web/tests/unit/routes/index-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - unit/routes/index-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-test.js should pass ESLint.\n');
  });
});
define('web/tests/unit/routes/not-found-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:not-found', 'Unit | Route | not found', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('web/tests/unit/routes/not-found-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - unit/routes/not-found-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/not-found-test.js should pass ESLint.\n');
  });
});
define('web/tests/unit/routes/strategy-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:strategy', 'Unit | Route | strategy', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('web/tests/unit/routes/strategy-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - unit/routes/strategy-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/strategy-test.js should pass ESLint.\n');
  });
});
define('web/tests/unit/routes/usoptions-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:usoptions', 'Unit | Route | usoptions', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('web/tests/unit/routes/usoptions-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - unit/routes/usoptions-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/usoptions-test.js should pass ESLint.\n');
  });
});
define('web/tests/unit/services/scripts-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('service:scripts', 'Unit | Service | scripts', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('web/tests/unit/services/scripts-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - unit/services/scripts-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/scripts-test.js should pass ESLint.\n');
  });
});
define('web/tests/unit/services/stocks-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('service:stocks', 'Unit | Service | stocks', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('web/tests/unit/services/stocks-test.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint - unit/services/stocks-test.js');
  QUnit.test('should pass ESLint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/stocks-test.js should pass ESLint.\n');
  });
});
require('web/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
