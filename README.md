（Gulp Expert）
## How to use Gulp
use the command prompt


## Install node.js
checking by using Terminal as below.
$ node -v
If in case that version information isn’t displayed, please install Node.js for Mac.Please refer to ( http://qiita.com/akakuro43/items/600e7e4695588ab2958d) or [the official site of Node.js (https://nodejs.org/en/download/)]


## Install gulp
npm install gulp -g

## command
<dl>
<dt>gulp clean</dt>
<dd>remove httpdocs</dd>

<dt>gulp sass</dt>
<dd>Compile sass to css in httpdocs</dd>

<dt>gulp ejs</dt>
<dd>Compile ejs to html in httpdocs</dd>

<dt>gulp imagemin</dt>
<dd>image compression in httpdocs</dd>

<dt>gulp cssminify</dt>
<dd>httpdocs/assets/css/ 
<dt>gulp jsminify</dt>
<dd>httpdocs/assets/js/
   
<dt>gulp cssbeautify</dt>


<dt>gulp csscomb</dt>


<dt>gulp build</dt>


<dt>gulp</dt>

</dl>

## ディレクトリルール
<dl>
<dt>src</dt>
<dd>For development</dd>
<dt>httpdocs</dt>
<dd>For Output</dd>
</dl>

src  
┣assets  
┃┠img     - jpg|png|gif|svg  
┃┠sass    - scss  
┃┠js      - js  
┃┠lib     - jQuery Plugin etc... 
┃┠include - include file   
┃┗etc     - many other  
┠sitemap.xml  
┗index.html|.php
gulpfile.js 
